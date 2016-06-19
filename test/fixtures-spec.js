import {assert} from "chai";
import fs from "fs";
import path from "path";
import dust from "../lib";

suite("dustjs-ast", function () {
	const contexts = fs.readdirSync(path.join(__dirname, "./fixtures"));

	function generate (context, kind) {
		const dir = path.join(__dirname, `./fixtures/${context}/${kind}`);

		try {
			fs.statSync(dir);
		} catch (error) {
			return;
		}

		fs.readdirSync(dir)
		.filter((item) => item.endsWith(".dust"))
		.map((item) => path.basename(item, path.extname(item)))
		.forEach((item) => {
			test(item, function () {
				const json = JSON.parse(fs.readFileSync(path.join(dir, `${item}.json`), "utf8"));

				if (kind === "expected") {
					assert.deepEqual(
						dust.parse(fs.readFileSync(path.join(dir, `${item}.dust`), "utf8")),
						json
					);
				} else if (kind === "unexpected") {
					try {
						dust.parse(fs.readFileSync(path.join(dir, `${item}.dust`), "utf8"));
					} catch (error) {
						assert.deepEqual(error, json);
					}
				}
			});
		});
	}

	contexts.forEach((context) => {
		suite(context, function () {
			suite("expected", function () {
				generate(context, "expected");
			});

			suite("unexpected", function () {
				generate(context, "unexpected");
			});
		});
	});
});

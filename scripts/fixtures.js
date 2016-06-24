import path from "path";
import fs from "fs";
import {execSync} from "child_process";
import _ from "lodash";
import yaml from "js-yaml";
import dust from "../lib";
import chalk from "chalk";

const fixtures = yaml.safeLoad(fs.readFileSync(path.join(__dirname, "./fixtures.yml"), "utf8"));

process.stdout.write("removing previous fixtures...\n\n");

execSync(`rm -rf ${path.resolve("./test/fixtures")}`);
execSync(`mkdir -p ${path.resolve("./test/fixtures")}`);

function generate (fixture, kind, context) {
	(fixture[kind] || []).forEach((template, index) => {
		const id = `${context}-${kind}-${_.padStart(`${index + 1}`, 3, "0")}`;
		let json;

		if (kind === "expected") {
			json = JSON.stringify(dust.parse(template), null, "\t");
		} else if (kind === "unexpected") {
			try {
				dust.parse(template);
				throw new Error("must throw error");
			} catch (error) {
				json = JSON.stringify(error, null, "\t");
			}
		}

		process.stdout.write(`=> ${chalk.blue(id)}: ${chalk.green(JSON.stringify(template))}\n`);

		execSync(`mkdir -p ${path.resolve(`./test/fixtures/${context}/${kind}`)}`);

		fs.writeFileSync(path.resolve(`./test/fixtures/${context}/${kind}/${id}.dust`), template);
		fs.writeFileSync(path.resolve(`./test/fixtures/${context}/${kind}/${id}.json`), json);
	});
}

fixtures.forEach((fixture) => {
	const context = fixture.context;

	process.stdout.write(`generating ${chalk.yellow(context)} fixtures...\n`);

	generate(fixture, "expected", context);
	generate(fixture, "unexpected", context);

	process.stdout.write("\n");
});

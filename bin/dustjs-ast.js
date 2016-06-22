#!/usr/bin/env node


const fs = require("fs");
const path = require("path");
const dust = require("../dist/dustjs-ast.js").default;
const program = require("commander");

program
	.version(require("../package").version)
	.command("*", "path to your dust template")
	.action((pathToDust) => {
		try {
			const code = fs.readFileSync(path.resolve(pathToDust), "utf8");
			const ast = JSON.stringify(dust.parse(code), null, "\t");
			process.stdout.write(`${ast}\n`);
		} catch (error) {
			const token = error.token;
			const loc = token.loc.start;
			const stderr = process.stderr;
			stderr.write(path.resolve(pathToDust));
			if (token) {
				stderr.write(`:${loc.line}:${loc.column}`);
			}
			stderr.write("\n\n");
			delete error.token;
			console.error(error); // eslint-disable-line
			process.exit(1);
		}
	});

program.parse(process.argv);

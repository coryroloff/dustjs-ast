#!/usr/bin/env babel-node

import fs from "fs";
import yaml from "js-yaml";
import table from "markdown-table";

const doc = yaml.safeLoad(fs.readFileSync(__dirname + "/docs.yml", "utf8"));

function write (value) {
	process.stdout.write(`${value}\n\n`);
}

const urls = {
	"String": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String",
	"Number": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number"
};

doc.sort(sortBy("class")).forEach(klass => {
	let header = `### ${klass.class}`;
	if (klass.extends) header += ` ⇒ ${type(klass.extends)}`;
	write(header);
	props(klass.properties, "Property");
	props(klass.constants, "Constant");
});

function props (data, header) {
	if (!data) return;
	const rows = [[header, "Type"]];
	data.forEach(prop => rows.push([prop.name, type(prop.type)]));
	write(table(rows));
}

function type (data) {
	const url = urls[data];
	if (!url) return `\`${data}\``;
	return `[\`${data}\`](${url})`;
}

function sortBy (key) {
	return (a, b) => {
		if (a[key] > b[key]) return 1;
		if (a[key] < b[key]) return -1;
		return 0;
	};
}

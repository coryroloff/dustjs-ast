#!/usr/bin/env babel-node

import fs from "fs";
import yaml from "js-yaml";
import table from "markdown-table";
import {htmlEncode} from "htmlencode";

const doc = yaml.safeLoad(fs.readFileSync(__dirname + "/docs.yml", "utf8"));

let output = "";

function writeln (value) {
	output += `${value}\n\n`;
}

const mdn = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects";

const types = {
	"String": `${mdn}/String`,
	"Number": `${mdn}/Number`,
	"Array": `${mdn}/Array`,
	"Boolean": `${mdn}/Boolean`
};

doc.forEach(klass => {
	// types[klass.class] = `#${klass.class}--${klass.extends}`;
	let anchor = `${klass.class}`;
	if (klass.extends) anchor += `--${klass.extends}`;
	types[klass.class] = `#${anchor.toLowerCase()}`;
});

doc.sort(sortBy("class")).forEach(klass => {
	let header = `### ${klass.class}`;
	if (klass.extends) header += ` ⇒ ${type(klass.extends)}`;
	writeln(header);
	if (klass.description) writeln(klass.description);
	props(klass.properties, "Property");
	props(klass.constants, "Constant");
});

const startMarker = "<!-- API: start -->";
const endMarker = "<!-- API: end -->";

let readme = fs.readFileSync("./README.md", "utf8");
const split1 = readme.split(startMarker);
const split2 = split1[1].split(endMarker);
split1.pop();
split2.shift();
split1.push(startMarker + "\n\n", output);
split2.unshift(endMarker);
split1.concat(split2);
readme = split1.concat(split2).join("");

fs.writeFileSync("./README.md", readme);

function props (data, header) {
	if (!data) return;
	const rows = [[header, "Type"]];
	data.forEach(prop => rows.push([prop.name, type(prop.type)]));
	writeln(table(rows));
}

function type (data) {
	let value = htmlEncode(data);
	let id = 0;
	const loc = [];
	for (const type in types) {
		const index = value.indexOf(type);
		if (index !== -1) {
			id++;
			loc.push({id: `__${id}__`, type});
			value = value.replace(type, `__${id}__`);
		}
	}
	loc.forEach(loc => {
		value = value.replace(loc.id, `[${loc.type}](${types[loc.type]})`);
	});
	return value;
}

function sortBy (key) {
	return (a, b) => {
		if (a[key] > b[key]) return 1;
		if (a[key] < b[key]) return -1;
		return 0;
	};
}

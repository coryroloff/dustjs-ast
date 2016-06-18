"use strict";

import Reader from "./reader";
import Template from "./template";
import parse from "./parse";

export default function parser (code) {
	const reader = new Reader(code);
	const ast = Template.parse(reader);

	while (!reader.peek().done) {
		ast.body.push(parse(reader));
	}

	return ast;
}

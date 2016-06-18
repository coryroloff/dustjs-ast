"use strict";

import Reader from "./reader";
import Token from "../lexer/token";
import Template from "./template";
import Buffer from "./buffer";
import Reference from "./reference";

export default function parser (code) {
	const reader = new Reader(code);
	const ast = Template.parse(reader);

	while (!reader.peek().done) {
		const token = reader.peek().value;

		switch (token.type) {
		case Token.Buffer:
			ast.body.push(Buffer.parse(reader));
			break;
		case Token.Punctuator:
			ast.body.push(parseSyntax(reader));
			break;
		default:
			reader.throwUnexpectedToken(token);
		}
	}

	return ast;
}

function parseSyntax (reader) {
	const startToken = reader.expect("{");
	const token = reader.peek().value;

	let node;

	if (token.type === Token.Key) {
		node = Reference.parse(reader);
	}

	const endToken = reader.expect("}");

	node.finalize(startToken, endToken);

	return node;
}

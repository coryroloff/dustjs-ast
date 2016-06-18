import Token from "../lexer/token";
import Buffer from "./buffer";
import Reference from "./reference";
import Section from "./section";

export default function parse (reader) {
	const token = reader.peek().value;

	switch (token.type) {
	case Token.Buffer:
		return Buffer.parse(reader);
	case Token.Punctuator:
		return parseSyntax(reader);
	default:
		reader.throwUnexpectedToken(token);
	}
}

function parseSyntax (reader) {
	const startToken = reader.expect("{");
	const token = reader.peek().value;

	let node;

	if (token.type === Token.Key) {
		node = Reference.parse(reader);
	} else if (reader.matchSection()) {
		node = Section.parse(reader);
	}

	const endToken = reader.expect("}");

	node.finalize(startToken, endToken);

	return node;
}

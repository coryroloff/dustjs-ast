import Token from "../lexer/token";
import Comment from "./comment";
import Buffer from "./buffer";
import Reference from "./reference";
import Section from "./section";

export default function parse (reader) {
	const token = reader.peek().value;

	switch (token.type) {
	case Token.Comment:
		return new Comment().parse(reader);
	case Token.Buffer:
		return new Buffer().parse(reader);
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
		node = new Reference().parse(reader);
	} else if (reader.matchSection()) {
		node = new Section().parse(reader);
	}

	const endToken = reader.expect("}");

	node.finalize(startToken, endToken);

	return node;
}

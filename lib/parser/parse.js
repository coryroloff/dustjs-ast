import Token from "../lexer/token";
import Comment from "./comment";
import Buffer from "./buffer";
import Reference from "./reference";
import Section from "./section";
import Special from "./special";

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
		return reader.throwUnexpectedToken(token);
	}
}

function parseSyntax (reader) {
	reader.expect("{");

	const token = reader.peek().value;

	if (token.type === Token.Key) {
		reader.prev();
		return new Reference().parse(reader);
	} else if (reader.matchSection()) {
		reader.prev();
		return new Section().parse(reader);
	} else if (reader.matchSpecial()) {
		reader.prev();
		return new Special().parse(reader);
	} else {
		this.throwUnexpectedToken(token);
	}
}

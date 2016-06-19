import Node from "./node";
import Token from "../lexer/token";
import Identifier from "./identifier";

export default class Speical extends Node {
	parse (reader) {
		const specials = ["s", "n", "r", "lb", "rb"];

		reader.expect("~");

		const token = reader.peek().value;

		if (token.type !== Token.Key || specials.indexOf(token.value) === -1) {
			reader.throwUnexpectedToken(token);
		}

		this.id = new Identifier().parse(reader);

		return this;
	}
}

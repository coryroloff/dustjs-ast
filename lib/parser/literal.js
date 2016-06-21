import Node from "./node";
import Token from "../lexer/token";

export default class Literal extends Node {
	constructor () {
		super();

		this.type = Node.Literal;
	}

	parse (reader) {
		const token = reader.expectType(Token.Literal);

		this.value = token.value;
		this.finalize(token, token);

		return this;
	}
}

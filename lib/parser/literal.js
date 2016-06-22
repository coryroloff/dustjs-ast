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

		if (/^[0-9.]+$/.test(token.value)) {
			this.value = parseFloat(this.value);
		}

		this.finalize(token, token);

		return this;
	}
}

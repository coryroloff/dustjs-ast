import Node from "./node";
import Token from "../lexer/token";

export default class StringLiteral extends Node {
	static test (reader) {
		return reader.peek().value.type === Token.StringLiteral;
	}

	constructor () {
		super();
		this.type = Node.StringLiteral;
	}

	parse (reader) {
		const token = reader.expectType(Token.StringLiteral);
		this.value = token.value;
		this.finalize(token, token);
		return this;
	}
}

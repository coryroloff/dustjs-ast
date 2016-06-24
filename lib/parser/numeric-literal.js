import Node from "./node";
import Token from "../lexer/token";

export default class NumericLiteral extends Node {
	static test (reader) {
		return reader.peek().value.type === Token.NumericLiteral;
	}

	constructor () {
		super();
		this.type = Node.NumericLiteral;
	}

	parse (reader) {
		const token = reader.expectType(Token.NumericLiteral);
		this.value = parseFloat(token.value);
		this.finalize(token, token);
		return this;
	}
}

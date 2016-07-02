// @flow

import Node from "./node";
import Reader from "./reader";
import Token from "../lexer/token";

export default class NumericLiteral extends Node {
	static test (reader: Reader): boolean {
		return reader.peek().value.type === Token.NumericLiteral;
	}

	value: number;

	constructor (): void {
		super();
		this.type = Node.NumericLiteral;
		this.value = 0;
	}

	parse (reader: Reader): this {
		super.parse(reader);
		const token = reader.expectType(Token.NumericLiteral);
		this.value = parseFloat(token.value);
		this.finalize(token, token);
		return this;
	}
}

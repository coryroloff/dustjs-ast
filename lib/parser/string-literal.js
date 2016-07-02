// @flow

import Node from "./node";
import Reader from "./reader";
import Token from "../lexer/token";

export default class StringLiteral extends Node {
	static test (reader: Reader): boolean {
		return reader.peek().value.type === Token.StringLiteral;
	}

	value: string;

	constructor (): void {
		super();
		this.type = Node.StringLiteral;
	}

	parse (reader: Reader): this {
		const token = reader.expectType(Token.StringLiteral);
		this.value = token.value;
		this.finalize(token, token);
		return this;
	}
}

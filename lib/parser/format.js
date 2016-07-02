// @flow

import Node from "./node";
import Reader from "./reader";
import Token from "../lexer/token";

export default class Format extends Node {
	static test (reader: Reader): boolean {
		return reader.matchType(Token.Format);
	}

	value: string;

	constructor (): void {
		super();
		this.type = Node.Format;
		this.value = "";
	}

	parse (reader: Reader): this {
		super.parse(reader);
		const token = reader.expectType(Token.Format);
		this.value = token.value;
		this.finalize(token, token);
		return this;
	}
}

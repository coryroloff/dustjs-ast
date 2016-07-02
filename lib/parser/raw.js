// @flow

import Node from "./node";
import Reader from "./reader";
import Token from "../lexer/token";

export default class Raw extends Node {
	static test (reader: Reader): boolean {
		return reader.matchType(Token.Raw);
	}

	value: string;

	constructor (): void {
		super();
		this.type = Node.Raw;
		this.value = "";
	}

	parse (reader: Reader): this {
		const token = reader.expectType(Token.Raw);
		this.value = token.value;
		this.finalize(token, token);
		return this;
	}
}

// @flow

import Node from "./node";
import Reader from "./reader";
import Token from "../lexer/token";

export default class Buffer extends Node {
	static test (reader: Reader): boolean {
		return reader.matchType(Token.Buffer);
	}

	value: string;

	constructor (): void {
		super();
		this.type = Node.Buffer;
		this.value = "";
	}

	parse (reader: Reader): this {
		super.parse(reader);
		const token = reader.expectType(Token.Buffer);
		this.value = token.value;
		this.finalize(token, token);
		return this;
	}
}

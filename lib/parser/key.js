// @flow

import Node from "./node";
import Reader from "./reader";
import Token from "../lexer/token";

export default class Key extends Node {
	static test (reader: Reader): boolean {
		return reader.matchType(Token.Key);
	}

	name: string;

	constructor (): void {
		super();
		this.type = Node.Key;
		this.name = "";
	}

	parse (reader: Reader): this {
		super.parse(reader);
		const token = reader.expectType(Token.Key);
		this.name = token.value;
		this.finalize(token, token);
		return this;
	}
}

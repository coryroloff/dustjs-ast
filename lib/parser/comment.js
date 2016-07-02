// @flow

import Node from "./node";
import Reader from "./reader";
import Token from "../lexer/token";

export default class Comment extends Node {
	static test (reader: Reader): boolean {
		return reader.matchType(Token.Comment);
	}

	value: string;

	constructor (): void {
		super();
		this.type = Node.Comment;
		this.value = "";
	}

	parse (reader: Reader): this {
		const token = reader.expectType(Token.Comment);
		this.value = token.value;
		this.finalize(token, token);
		return this;
	}
}

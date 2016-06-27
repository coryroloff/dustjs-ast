import Node from "./node";
import Token from "../lexer/token";

export default class Comment extends Node {
	static test (reader) {
		return reader.matchType(Token.Comment);
	}

	constructor () {
		super();
		this.type = Node.Comment;
		this.value = "";
	}

	parse (reader) {
		const token = reader.expectType(Token.Comment);
		this.value = token.value;
		this.finalize(token, token);
		return this;
	}
}

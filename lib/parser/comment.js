import Node from "./node";
import Token from "../lexer/token";

export default class Comment extends Node {
	static test (reader) {
		return reader.matchType(Token.Comment);
	}

	constructor () {
		super();

		this.type = Node.Comment;
	}

	parse (reader) {
		const token = reader.next().value;

		this.text = token.value;
		this.finalize(token, token);

		return this;
	}
}

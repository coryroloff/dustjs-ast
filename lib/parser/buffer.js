import Node from "./node";
import Token from "../lexer/token";

export default class Buffer extends Node {
	static test (reader) {
		return reader.matchType(Token.Buffer);
	}

	constructor () {
		super();
		this.type = Node.Buffer;
		this.value = "";
	}

	parse (reader) {
		const token = reader.expectType(Token.Buffer);
		this.value = token.value;
		this.finalize(token, token);
		return this;
	}
}

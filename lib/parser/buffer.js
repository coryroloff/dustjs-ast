import Node from "./node";
import Token from "../lexer/token";

export default class Buffer extends Node {
	static test (reader) {
		return reader.matchType(Token.Buffer);
	}

	constructor () {
		super();

		this.type = Node.Buffer;
	}

	parse (reader) {
		const token = reader.next().value;

		this.text = token.value;
		this.finalize(token, token);

		return this;
	}
}

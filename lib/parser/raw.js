import Node from "./node";
import Token from "../lexer/token";

export default class Raw extends Node {
	static test (reader) {
		return reader.matchType(Token.Raw);
	}

	constructor () {
		super();

		this.type = Node.Raw;
	}

	parse (reader) {
		const token = reader.expectType(Token.Raw);
		this.text = token.value;
		this.finalize(token, token);
		return this;
	}
}

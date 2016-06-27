import Node from "./node";
import Token from "../lexer/token";

export default class Raw extends Node {
	static test (reader) {
		return reader.matchType(Token.Raw);
	}

	constructor () {
		super();
		this.type = Node.Raw;
		this.value = "";
	}

	parse (reader) {
		const token = reader.expectType(Token.Raw);
		this.value = token.value;
		this.finalize(token, token);
		return this;
	}
}

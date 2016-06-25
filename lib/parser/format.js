import Node from "./node";
import Token from "../lexer/token";

export default class Format extends Node {
	constructor () {
		super();
		this.type = Node.Format;
		this.text = "";
	}

	static test (reader) {
		return reader.matchType(Token.Format);
	}

	parse (reader) {
		const token = reader.expectType(Token.Format);
		this.text = token.value;
		this.finalize(token, token);
		return this;
	}
}

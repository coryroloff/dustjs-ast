import Node from "./node";
import Token from "../lexer/token";

export default class Raw extends Node {
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

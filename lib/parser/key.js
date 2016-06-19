import Node from "./node";
import Token from "../lexer/token";

export default class Key extends Node {
	constructor () {
		super();

		this.type = Node.Key;
	}

	parse (reader) {
		const token = reader.next().value;

		if (token.type !== Token.Key) {
			reader.throwUnexpectedToken(token);
		}

		this.name = token.value;
		this.finalize(token, token);

		return this;
	}
}

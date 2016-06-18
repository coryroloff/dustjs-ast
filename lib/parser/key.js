import Node from "./node";
import Token from "../lexer/token";

export default class Key extends Node {
	static parse (reader) {
		const token = reader.next().value;

		if (token.type !== Token.Key) {
			reader.throwUnexpectedToken(token);
		}

		return new Key(token);
	}

	constructor (token) {
		super();

		this.name = token.value;
		this.finalize(token, token);
	}
}

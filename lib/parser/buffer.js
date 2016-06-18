"use strict";

import Node from "./node";
import Token from "../lexer/token";

export default class Buffer extends Node {
	static parse (reader) {
		const token = reader.next().value;

		if (token.type !== Token.Buffer) {
			reader.throwUnexpectedToken(token);
		}

		return new Buffer(token);
	}

	constructor (token) {
		super();

		this.text = token.value;
		this.finalize(token, token);
	}
}

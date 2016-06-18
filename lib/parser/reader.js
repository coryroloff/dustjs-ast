"use strict";

import lexer from "../lexer";
import Token from "../lexer/token";

export default class Reader {
	constructor (code) {
		this.tokens = lexer(code);
		this[Symbol.iterator] = () => this;
	}

	next () {
		this.token = this.tokens.shift();

		return {
			value: this.token,
			done: !this.token
		};
	}

	peek () {
		const token = this.tokens[0];

		return {
			value: token,
			done: !token
		};
	}

	expect (value) {
		const token = this.next().value;

		if (token.type !== Token.Punctuator || token.value !== value) {
			this.throwUnexpectedToken(token);
		}

		return token;
	}

	match (value) {
		const token = this.peek().value;
		return (token.type === Token.Punctuator && token.value === value);
	}

	throwUnexpectedToken (token) {
		throw new Error(`Unexpected token: \`${token.value}\``);
	}
}

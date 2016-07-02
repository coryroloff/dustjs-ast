// @flow

import Node from "./node";
import SyntaxError from "./syntax-error";
import Token from "../lexer/token";
import lexer from "../lexer";

const sections = ["#", "?", "^", "<", "+", "@", "%"];

export default class Reader {
	options: Object;
	code: string;
	tokenHistory: Array<Token>;
	tokens: Array<Token>;
	token: ?Token;
	nodes: Array<Node>;

	constructor (code: string, options: Object = {}): void {
		this.options = options;
		this.code = code;
		this.tokenHistory = [];
		this.tokens = lexer(code, options);
		this.nodes = [];
	}

	next (): {value: Token, done: boolean} {
		if (this.token) {
			this.tokenHistory.push(this.token);
		}

		this.token = this.tokens.shift();

		return {
			value: this.token,
			done: !this.token
		};
	}

	prev (): void {
		if (this.token) {
			this.tokens.unshift(this.token);
		}

		this.token = this.tokenHistory.pop();
	}

	peek (): {value: Token, done: boolean} {
		const token = this.tokens[0];

		return {
			value: token,
			done: !token
		};
	}

	expect (value: string): Token {
		const token = this.next().value;

		if ((token && (token.type !== Token.Punctuator || token.value !== value)) || !token) {
			this.throwUnexpectedToken(token);
		}

		return token;
	}

	expectType (type: string): Token {
		const token = this.next().value;

		if (!token) {
			this.throwUnexpectedToken();
		}

		if (token.type !== type) {
			this.throwUnexpectedToken(token);
		}

		return token;
	}

	expectSection (): Token {
		const token = this.next().value;

		if (!token) {
			this.throwUnexpectedToken();
		}

		if (token.type !== Token.Punctuator || sections.indexOf(token.value) === -1) {
			this.throwUnexpectedToken(token);
		}

		return token;
	}

	expectPartial (): Token {
		const token = this.next().value;

		if (!token) {
			this.throwUnexpectedToken();
		}

		if (token.type !== Token.Punctuator && token.value !== ">" && token.value !== "+") {
			this.throwUnexpectedToken(token);
		}

		return token;
	}

	match (value: string): boolean {
		const token = this.peek().value;

		if (!token) {
			return false;
		}

		return (token.type === Token.Punctuator && token.value === value);
	}

	matchType (type: string): boolean {
		const token = this.peek().value;

		if (!token) {
			return false;
		}

		return (token.type === type);
	}

	matchSection (): boolean {
		const token = this.peek().value;
		return token.type === Token.Punctuator && sections.indexOf(token.value) !== -1;
	}

	matchSpecial (): boolean {
		const token = this.peek().value;
		return token.type === Token.Punctuator && token.value === "~";
	}

	matchPartial (): boolean {
		const token = this.peek().value;
		return token.type === Token.Punctuator && (token.value === ">" || token.value === "+");
	}

	throwUnexpectedToken (token: ?Token): void {
		if (!token && this.tokens.length === 0) {
			throw new Error("Unexpected end of input");
		} else if (token) {
			const error = new SyntaxError(`Unexpected token: \`${token.value}\``);
			error.token = token;
			throw error;
		}
	}
}

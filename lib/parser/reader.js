import lexer from "../lexer";
import Token from "../lexer/token";

export default class Reader {
	constructor (code) {
		this.tokens = lexer(code).filter((token) => {
			return token.type !== Token.Whitespace;
		});

		this.tokenHistory = [];

		this[Symbol.iterator] = () => this;
	}

	next () {
		if (this.token) {
			this.tokenHistory.push(this.token);
		}

		this.token = this.tokens.shift();

		return {
			value: this.token,
			done: !this.token
		};
	}

	prev () {
		if (this.token) {
			this.tokens.unshift(this.token);
		}

		this.token = this.tokenHistory.pop();
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

		if (!token) {
			this.throwUnexpectedToken();
		}

		if (token.type !== Token.Punctuator || token.value !== value) {
			this.throwUnexpectedToken(token);
		}

		return token;
	}

	expectSection () {
		const token = this.next().value;

		if (!token) {
			this.throwUnexpectedToken();
		}

		if (["#", "?", "^"].indexOf(token.value) === -1) {
			this.throwUnexpectedToken(token);
		}

		return token;
	}

	match (value) {
		const token = this.peek().value;

		if (!token) {
			return false;
		}

		return (token.type === Token.Punctuator && token.value === value);
	}

	matchSection () {
		const token = this.peek().value;
		return token.type === Token.Punctuator && ["#", "?", "^"].indexOf(token.value) !== -1;
	}

	matchSpecial () {
		const token = this.peek().value;
		return token.type === Token.Punctuator && token.value === "~";
	}

	throwUnexpectedToken (token) {
		if (!token && this.tokens.length === 0) {
			throw new Error("Unexpected end of input");
		} else {
			const error = new Error(`Unexpected token: \`${token.value}\``);
			error.token = token;
			throw error;
		}
	}
}

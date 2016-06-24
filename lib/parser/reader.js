import lexer from "../lexer";
import Token from "../lexer/token";

const sections = ["#", "?", "^", "<", "+", "@", "%"];

export default class Reader {
	constructor (code) {
		this.tokens = lexer(code).filter((token) => {
			return token.type !== Token.Format;
		});

		this.tokenHistory = [];
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
		this.tokens.unshift(this.token);
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

	expectType (type) {
		const token = this.next().value;

		if (!token) {
			this.throwUnexpectedToken();
		}

		if (token.type !== type) {
			this.throwUnexpectedToken(token);
		}

		return token;
	}

	expectSection () {
		const token = this.next().value;

		if (!token) {
			this.throwUnexpectedToken();
		}

		if (token.type !== Token.Punctuator || sections.indexOf(token.value) === -1) {
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

	matchType (type) {
		const token = this.peek().value;

		if (!token) {
			return false;
		}

		return (token.type === type);
	}

	matchSection () {
		const token = this.peek().value;
		return token.type === Token.Punctuator && sections.indexOf(token.value) !== -1;
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

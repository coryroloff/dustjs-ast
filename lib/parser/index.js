import lexer from "../lexer";
import * as Token from "../lexer/token";

export default class Parser {
	constructor (code) {
		this.tokens = lexer(code);
		this.ast = {
			type: "Template",
			body: []
		};
		this.readTokens();
	}

	nextToken (peek = false) {
		if (!peek) {
			this.token = this.tokens.shift();
			return this.token;
		} else {
			return this.tokens[0];
		}
	}

	expect (value) {
		const token = this.nextToken();
		if (token.type !== Token.Punctuator || token.value !== value) {
			this.throwUnexpectedToken(token);
		}
		return token;
	}

	match (value) {
		const token = this.nextToken(true);
		return (token.type === Token.Punctuator && token.value === value);
	}

	throwUnexpectedToken (token) {
		throw new Error(`Unexpected token: \`${token.value}\``);
	}

	readTokens () {
		let token;
		while ((token = this.nextToken(true))) {
			switch (token.type) {
			case Token.Punctuator:
				this.parse();
				break;
			case Token.Buffer:
				this.parseBuffer();
				break;
			default:
				this.throwUnexpectedToken(token);
			}
		}
	}

	parseBuffer () {
		const token = this.nextToken();

		if (token.type === Token.Buffer) {
			this.ast.body.push(token);
		} else {
			this.throwUnexpectedToken(token);
		}
	}

	parse () {
		const startToken = this.expect("{");

		const token = this.nextToken();

		switch (token.type) {
		case Token.Key:
			this.parseReference(startToken);
			break;
		default:
			this.throwUnexpectedToken(token);
		}
	}

	parseReference (startToken) {
		const node = {
			type: "Reference",
			path: [this.token],
			loc: {
				start: {
					line: startToken.loc.start.line,
					column: startToken.loc.start.column
				}
			},
			range: {
				start: startToken.range.start
			}
		};

		if (this.match(".")) {
			while ((this.nextToken(true))) {
				this.expect(".");

				const key = this.nextToken();

				if (key.type === Token.Key) {
					node.path.push(key);
				} else {
					this.throwUnexpectedToken(key);
				}

				if (!this.match(".")) {
					break;
				}
			}
		}

		const endToken = this.expect("}");

		node.loc.end = {
			line: endToken.loc.end.line,
			column: endToken.loc.end.column
		};

		node.range.end = endToken.range.end;

		this.ast.body.push(node);
	}
}

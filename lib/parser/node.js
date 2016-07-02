// @flow

import Reader from "./reader";
import Token from "../lexer/token";

export default class Node {
	static get Block (): string { return "Block"; }
	static get Buffer (): string { return "Buffer"; }
	static get Comment (): string { return "Comment"; }
	static get Identifier (): string { return "Identifier"; }
	static get Inline (): string { return "Inline"; }
	static get Key (): string { return "Key"; }
	static get StringLiteral (): string { return "StringLiteral"; }
	static get NumericLiteral (): string { return "NumericLiteral"; }
	static get NamedBlock (): string { return "NamedBlock"; }
	static get Param (): string { return "Param"; }
	static get Partial (): string { return "Partial"; }
	static get Raw (): string { return "Raw"; }
	static get Reference (): string { return "Reference"; }
	static get Section (): string { return "Section"; }
	static get Special (): string { return "Special"; }
	static get Template (): string { return "Template"; }
	static get Format (): string { return "Format"; }

	static test (reader: Reader): boolean { // eslint-disable-line no-unused-vars
		return false;
	}

	type: string;
	startToken: Token;
	endToken: Token;
	start: number;
	end: number;
	loc: {
		start: {
			line: number;
			column: number;
		};
		end: {
			line: number;
			column: number;
		}
	};

	constructor (): void {
		this.type = "";
		this.startToken = new Token("");
		this.endToken = new Token("");
	}

	parse (reader: Reader): this { // eslint-disable-line no-unused-vars
		return this;
	}

	finalize (startToken: Token, endToken: ?Token): void {
		this.startToken = startToken;

		if (startToken && !endToken) {
			this.endToken = startToken;
			this.start = startToken.start;
			this.end = startToken.start;
			this.loc = {
				start: startToken.loc.start,
				end: startToken.loc.start
			};
		} else if (startToken === endToken) {
			this.endToken = startToken;
			this.start = startToken.start;
			this.end = startToken.end;
			this.loc = startToken.loc;
		} else if (endToken) {
			this.endToken = endToken;
			this.start = startToken.start;
			this.end = endToken.end;

			this.loc = {
				start: {
					line: startToken.loc.start.line,
					column: startToken.loc.start.column
				},
				end: {
					line: endToken.loc.end.line,
					column: endToken.loc.end.column
				}
			};
		}
	}
}

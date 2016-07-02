// @flow

import Scanner from "./scanner";

export default class Token {
	static get Comment (): string { return "Comment"; }
	static get Key (): string { return "Key"; }
	static get StringLiteral (): string { return "StringLiteral"; }
	static get NumericLiteral (): string { return "NumericLiteral"; }
	static get Punctuator (): string { return "Punctuator"; }
	static get Format (): string { return "Format"; }
	static get Buffer (): string { return "Buffer"; }
	static get Raw (): string { return "Raw"; }

	type: string;
	value: string;
	line: number;
	lineStart: number;
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

	constructor (type: string, value: string = ""): void {
		this.type = type;
		this.value = value;
		this.line = 0;
		this.lineStart = 0;
		this.start = 0;
		this.end = 0;
		this.loc = {
			start: {line: 0, column: 0},
			end: {line: 0, column: 0}
		};
	}

	configure (scanner: Scanner): void {
		this.line = scanner.line;
		this.lineStart = scanner.lineStart;
		this.start = scanner.index;
	}

	finalize (): void {
		this.loc.start = {
			line: this.line,
			column: this.start - this.lineStart
		};
	}

	toString (): string {
		return this.value;
	}
}

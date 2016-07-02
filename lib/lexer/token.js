export default class Token {
	static get Comment () { return "Comment"; }
	static get Key () { return "Key"; }
	static get StringLiteral () { return "StringLiteral"; }
	static get NumericLiteral () { return "NumericLiteral"; }
	static get Punctuator () { return "Punctuator"; }
	static get Format () { return "Format"; }
	static get Buffer () { return "Buffer"; }
	static get Raw () { return "Raw"; }

	constructor (type, value = "") {
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

	configure (scanner) {
		this.line = scanner.line;
		this.lineStart = scanner.lineStart;
		this.start = scanner.index;
	}

	finalize () {
		this.loc = {
			start: {
				line: this.line,
				column: this.start - this.lineStart
			}
		};
	}

	toString () {
		return this.value;
	}
}

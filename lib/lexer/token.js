export default class Token {
	static get Comment () { return "Comment"; }
	static get Key () { return "Key"; }
	static get Literal () { return "Literal"; }
	static get Punctuator () { return "Punctuator"; }
	static get Whitespace () { return "Whitespace"; }
	static get Buffer () { return "Buffer"; }

	constructor (type, value = "") {
		this.type = type;
		this.value = value;
		this.lineNumber = 0;
		this.lineStart = 0;
		this.start = 0;
		this.loc = {
			start: {lineNumber: 0, column: 0},
			end: {lineNumber: 0, column: 0}
		};
	}

	configure (scanner) {
		this.lineNumber = scanner.lineNumber;
		this.lineStart = scanner.lineStart;
		this.start = scanner.index;
	}

	finalize () {
		this.loc = {
			start: {
				line: this.lineNumber,
				column: (this.start - this.lineStart) + 1
			}
		};
	}

	toString () {
		return this.value;
	}
}

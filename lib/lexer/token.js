export default class Token {
	constructor (type, value = "") {
		this.type = type;
		this.value = value;
		this.lineNumber = 0;
		this.lineStart = 0;
		this.start = 0;
		this.end = 0;
		this.loc = {
			start: {lineNumber: 0, column: 0},
			end: {lineNumber: 0, column: 0}
		};
		this.range = {
			start: 0,
			end: 0
		};
	}

	configure (scanner) {
		this.lineNumber = scanner.lineNumber;
		this.lineStart = scanner.lineStart;
		this.start = scanner.index;
		this.end = scanner.index + this.value.length;
	}

	static get Comment () { return "Comment"; }
	static get Key () { return "Key"; }
	static get Literal () { return "Literal"; }
	static get Punctuator () { return "Punctuator"; }
	static get Whitespace () { return "Whitespace"; }
	static get Buffer () { return "Buffer"; }
}

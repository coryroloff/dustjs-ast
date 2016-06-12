export default class Scanner {
	constructor (code) {
		this.code = code.split("");
		this.index = 0;
		this.lineNumber = (code.length > 0) ? 1 : 0;
		this.lineStart = 1;
		this.char = null;
	}

	isLineTerminator (char) {
		return ["\n", "\r", "\r\n", "\u2028", "\u2029"].indexOf(char) !== -1;
	}

	read () {
		this.char = this.code.shift();
		this.index++;

		if (this.isLineTerminator(this.char + this.peek())) {
			this.lineNumber++;
			this.char += this.peek();
			this.code.shift();
			this.lineStart = this.index;
		} else if (this.isLineTerminator(this.char)) {
			this.lineNumber++;
			this.lineStart = this.index;
		}

		return this.char;
	}

	peek () {
		if (this.code.length > 0) {
			return this.code[0];
		}
	}
}

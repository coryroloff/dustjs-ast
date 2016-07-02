export default class Scanner {
	constructor (code = "", options = {indexOffset: 0, lineOffset: 0, lineStartOffset: 0}) {
		const indexOffset = (options.indexOffset > 0 ? options.indexOffset : 0);
		const lineOffset = (options.lineOffset > 0 ? options.lineOffset : 0);
		const lineStartOffset = (options.lineStartOffset > 0 ? options.lineStartOffset : 0);

		this[Symbol.iterator] = () => this;
		this.code = code.split("");
		this.index = -1 + indexOffset;
		this.line = (code.length > 0) ? 1 + lineOffset : 0;
		this.lineStart = 0 + lineStartOffset;
		this.char = "";
		this.lineCache = null;
	}

	isLineTerminator (char) {
		return ["\n", "\r", "\r\n", "\u2028", "\u2029"].indexOf(char) !== -1;
	}

	next () {
		if (this.lineCache) {
			this.line = this.lineCache.line;
			this.lineStart = this.lineCache.lineStart;
			this.lineCache = null;
		}

		this.char = this.code.shift();
		this.index++;

		if (this.isLineTerminator(this.char + this.peek())) {
			this.char += this.peek();
			this.code.shift();
		}

		if (this.isLineTerminator(this.char)) {
			this.lineCache = {
				line: this.line + 1,
				lineStart: this.index
			};
		}

		return {
			value: this.char,
			done: !this.char
		};
	}

	peek () {
		return this.code[0] || "";
	}
}

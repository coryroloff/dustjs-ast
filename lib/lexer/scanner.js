// @flow

export default class Scanner {
	code: Array<string>;
	index: number;
	line: number;
	lineStart: number;
	char: string;
	lineCache: ?{
		line: number;
		lineStart: number
	};

	constructor (code: string = "", options: Object = {}) {
		const opts = Object.assign({
			indexOffset: 0,
			lineOffset: 0,
			lineStartOffset: 0
		}, options);

		// $FlowIssue
		this[Symbol.iterator] = (): this => this;
		this.code = code.split("");
		this.index = -1 + opts.indexOffset;
		this.line = (code.length > 0) ? 1 + opts.lineOffset : 0;
		this.lineStart = 0 + opts.lineStartOffset;
		this.char = "";
		this.lineCache = null;
	}

	isLineTerminator (char: string): boolean {
		return ["\n", "\r", "\r\n", "\u2028", "\u2029"].indexOf(char) !== -1;
	}

	next (): {value: string; done: boolean} {
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

	peek (): string {
		return this.code[0] || "";
	}
}

export default class Node {
	static get Block () { return "Block"; }
	static get Buffer () { return "Buffer"; }
	static get Comment () { return "Comment"; }
	static get Identifier () { return "Identifier"; }
	static get Inline () { return "Inline"; }
	static get Key () { return "Key"; }
	static get StringLiteral () { return "StringLiteral"; }
	static get NumericLiteral () { return "NumericLiteral"; }
	static get NamedBlock () { return "NamedBlock"; }
	static get Param () { return "Param"; }
	static get Partial () { return "Partial"; }
	static get Raw () { return "Raw"; }
	static get Reference () { return "Reference"; }
	static get Section () { return "Section"; }
	static get Special () { return "Special"; }
	static get Template () { return "Template"; }

	static test () {
		throw new Error("Override test");
	}

	constructor () {
		this.type = null;
	}

	parse () {
		throw new Error("Override parse");
	}

	finalize (startToken, endToken) {
		if (startToken && !endToken) {
			this.start = startToken.start;
			this.end = startToken.end;
			this.loc = {
				start: startToken.loc.start,
				end: startToken.loc.start
			};
			return;
		}

		if (startToken === endToken) {
			this.start = startToken.start;
			this.end = startToken.end;
			this.loc = startToken.loc;
			return;
		}

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

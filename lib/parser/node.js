export default class Node {
	static get Block () { return "Block"; }
	static get Buffer () { return "Buffer"; }
	static get Comment () { return "Comment"; }
	static get Identifier () { return "Identifier"; }
	static get Inline () { return "Inline"; }
	static get Key () { return "Key"; }
	static get Literal () { return "Literal"; }
	static get NamedBlock () { return "NamedBlock"; }
	static get Param () { return "Param"; }
	static get Partial () { return "Partial"; }
	static get Raw () { return "Raw"; }
	static get Reference () { return "Reference"; }
	static get Section () { return "Section"; }
	static get Special () { return "Special"; }
	static get Template () { return "Template"; }

	constructor () {
		this.type = null;
	}

	parse () {
		throw new Error("override parse");
	}

	finalize (startToken, endToken) {
		if (startToken === endToken) {
			this.loc = startToken.loc;

			return;
		}

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

export default class Node {
	static get Buffer () { return "Buffer"; }
	static get Comment () { return "Comment"; }
	static get Identifier () { return "Identifier"; }
	static get Key () { return "Key"; }
	static get Param () { return "Param"; }
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

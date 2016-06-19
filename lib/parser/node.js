export default class Node {
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

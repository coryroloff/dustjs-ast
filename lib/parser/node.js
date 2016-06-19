"use strict";

export default class Node {
	parse () {
		throw new Error("override parse");
	}

	finalize () {
		// if (startToken === endToken) {
		// 	this.loc = startToken.loc;
		// 	this.range = startToken.range;
		//
		// 	return;
		// }
		//
		// this.loc = {
		// 	start: {
		// 		line: startToken.loc.start.line,
		// 		column: startToken.loc.start.column
		// 	},
		// 	end: {
		// 		line: endToken.loc.end.line,
		// 		column: endToken.loc.end.column
		// 	}
		// };
		//
		// this.range = {
		// 	start: startToken.range.start,
		// 	end: endToken.range.end
		// };
	}
}

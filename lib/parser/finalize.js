export default function finalize (node, startToken, endToken) {
	node.loc = {
		start: {
			line: startToken.loc.start.line,
			column: startToken.loc.start.column
		},
		end: {
			line: endToken.loc.end.line,
			column: endToken.loc.end.column
		}
	};

	node.range = {
		start: startToken.range.start,
		end: endToken.range.end
	};

	return node;
}

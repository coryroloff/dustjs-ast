export default function finalize (tokens, scanner) {
	let prevToken;

	for (let token of tokens) {
		token.loc = {
			start: {
				line: token.lineNumber,
				column: (token.start - token.lineStart) + 1
			}
		};

		token.range = {
			start: token.start,
			end: token.end
		};

		if (prevToken) {
			prevToken.loc.end = token.loc.start;
		}

		prevToken = token;
	}

	prevToken.loc.end = {
		line: scanner.lineNumber,
		column: (prevToken.end - prevToken.lineStart) + 1
	};

	for (let token of tokens) {
		delete token.lineNumber;
		delete token.lineStart;
		delete token.start;
		delete token.end;
	}
}

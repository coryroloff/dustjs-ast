export default function finalize (tokens) {
	let prevToken;

	for (const token of tokens) {
		if (token.start === undefined ||
			token.lineStart === undefined ||
			token.lineNumber === undefined) {

			prevToken.loc.end = token.loc.start;
			prevToken = token;
			continue;
		}

		token.finalize();

		if (prevToken) {
			prevToken.loc.end = token.loc.start;
		}

		prevToken = token;
	}

	tokens.pop();

	for (const token of tokens) {
		delete token.lineNumber;
		delete token.lineStart;
		delete token.start;
	}
}

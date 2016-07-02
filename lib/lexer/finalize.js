export default function finalize (tokens) {
	let prevToken;

	for (const token of tokens) {
		if (token.start === undefined ||
			token.lineStart === undefined ||
			token.line === undefined) {

			prevToken.loc.end = token.loc.start;
			prevToken.end = token.start;
			prevToken = token;
			continue;
		}

		token.finalize();

		if (prevToken) {
			prevToken.loc.end = token.loc.start;
			prevToken.end = token.start;
		}

		prevToken = token;
	}

	tokens.pop();

	tokens.forEach(token => {
		delete token.line;
		delete token.lineStart;
	});
}

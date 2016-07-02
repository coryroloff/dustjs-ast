// @flow

import Token from "./token";

export default function finalize (tokens: Array<Token>): void {
	let prevToken;

	for (const token of tokens) {
		if ((token.start === undefined ||
			token.lineStart === undefined ||
			token.line === undefined) && prevToken) {

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

	tokens.forEach((token: Token): void => {
		delete token.line;
		delete token.lineStart;
	});
}

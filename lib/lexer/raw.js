// @flow

import Scanner from "./scanner";
import Token from "./token";

export default function scanRaw (scanner: Scanner): ?Token {
	if (scanner.char !== "`") {
		return;
	}

	const token = new Token(Token.Raw);
	token.configure(scanner);
	token.start = scanner.index - 1;

	// $FlowIssue
	for (const char of scanner) {
		if (char === "`" && scanner.peek() === "}") {
			break;
		}

		token.value += char;
	}

	return token;
}

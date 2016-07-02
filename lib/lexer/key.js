// @flow

import Scanner from "./scanner";
import Token from "./token";

export default function scanKey (scanner: Scanner): ?Token {
	if (!/[a-zA-Z_$]/.test(scanner.char)) {
		return;
	}

	const token = new Token(Token.Key, scanner.char);
	token.configure(scanner);

	const rx = /[0-9a-zA-Z_$-]/;

	if (!rx.test(scanner.peek())) {
		return token;
	}

	// $FlowIssue
	for (const char of scanner) {
		token.value += char;

		if (!rx.test(scanner.peek())) {
			break;
		}
	}

	return token;
}

// @flow

import Scanner from "./scanner";
import Token from "./token";

export const format = [
	" ", "\t", "\v", "\f", "\u00A0", "\uFEFF",
	"\n", "\r", "\r\n", "\u2028", "\u2029"
];

export default function scanFormat (scanner: Scanner): ?Token {
	if (format.indexOf(scanner.char) === -1) {
		return;
	}

	const token = new Token(Token.Format, scanner.char);
	token.configure(scanner);

	if (format.indexOf(scanner.peek()) !== -1) {
		// $FlowIssue
		for (const char of scanner) {
			token.value += char;

			if (format.indexOf(scanner.peek()) === -1) {
				break;
			}
		}
	}

	return token;
}

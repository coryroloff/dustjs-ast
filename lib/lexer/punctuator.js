// @flow

import Scanner from "./scanner";
import Token from "./token";

const punctuators = [
	".", "#", "^", "/", "@", ">", "<", "+",
	"?", ":", "=", "|", "~", "%", "[", "]"
];

export default function scanPunctuator (scanner: Scanner): ?Token {
	if (punctuators.indexOf(scanner.char) === -1) {
		return;
	}

	const token = new Token(Token.Punctuator, scanner.char);
	token.configure(scanner);

	return token;
}

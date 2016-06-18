"use strict";

import Token from "./token";

const punctuators = [
	".", "#", "^", "/", "@", "%", ">", "<",
	"+", "?", ":", "=", "|", "[", "]", "~"
];

export default function scanPunctuator (scanner) {
	if (punctuators.indexOf(scanner.char) === -1) {
		return;
	}

	const token = new Token(Token.Punctuator, scanner.char);
	token.configure(scanner);

	return token;
}

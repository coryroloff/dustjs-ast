"use strict";

import Token from "./token";

export default function scanComment (scanner) {
	if (scanner.char !== "!") {
		return;
	}

	const token = new Token(Token.Comment);
	token.configure(scanner);
	token.start = scanner.index - 1;
	
	for (const char of scanner) {
		if (char === "!" && scanner.peek() === "}") {
			token.end = scanner.index + 3;
			break;
		}

		token.value += char;
	}

	return token;
}

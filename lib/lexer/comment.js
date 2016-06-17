"use strict";

import {Comment} from "./token";

export default function scanComment (scanner) {
	if (scanner.char !== "!") {
		return;
	}

	const token = {
		type: Comment,
		value: "",
		lineNumber: scanner.lineNumber,
		lineStart: scanner.lineStart,
		start: scanner.index - 1
	};

	for (const char of scanner) {
		if (char === "!" && scanner.peek() === "}") {
			token.end = scanner.index + 3;
			break;
		}

		token.value += char;
	}

	return token;
}

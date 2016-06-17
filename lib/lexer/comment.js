"use strict";

import {Comment} from "./token";

export default function scanComment (scanner) {
	if (scanner.char !== "!") {
		return;
	}

	const token = {
		type: Comment,
		value: ""
	};

	token.lineNumber = scanner.lineNumber;
	token.lineStart = scanner.lineStart;
	token.start = scanner.index - 1;

	for (const char of scanner) {
		if (char === "!" && scanner.peek() === "}") {
			token.end = scanner.index + 3;
			break;
		} else {
			token.value += char;
		}
	}

	return token;
}

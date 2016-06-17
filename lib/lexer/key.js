"use strict";

import {Key} from "./token";

export default function scanKey (scanner) {
	if (!/[a-zA-Z_$]/.test(scanner.char)) {
		return;
	}

	const token = {
		type: Key,
		value: scanner.char,
		lineNumber: scanner.lineNumber,
		lineStart: scanner.lineStart,
		start: scanner.index,
		end: scanner.index + 1
	};

	const rx = /[0-9a-zA-Z_$-]/;

	if (!rx.test(scanner.peek())) {
		return token;
	}

	for (const char of scanner) {
		token.value += char;

		if (!rx.test(scanner.peek())) {
			token.end = scanner.index + 1;
			break;
		}
	}

	return token;
}

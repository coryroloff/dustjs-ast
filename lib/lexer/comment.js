"use strict";

import {Comment} from "./token";

export default function scanComment (scanner) {
	let code = "";
	let lineNumber, lineStart, start, end;

	if (scanner.char === "!") {
		lineNumber = scanner.lineNumber;
		lineStart = scanner.lineStart;
		start = scanner.index - 1;

		for (const char of scanner) {
			if (char === "!" && scanner.peek() === "}") {
				end = scanner.index + 3;
				break;
			} else {
				code += char;
			}
		}
	}

	if (code !== "") {
		return {
			type: Comment,
			value: code,
			lineNumber,
			lineStart,
			start,
			end
		};
	}
}

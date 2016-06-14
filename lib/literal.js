"use strict";

import tokenize from "./tokenize";
import {Literal, Buffer} from "./token";

export default function scanLiteral (scanner) {
	let char;
	let prevChar;
	let code = "";
	let lineNumber, lineStart, start;

	if (scanner.char === "\"") {
		code += scanner.char;

		lineNumber = scanner.lineNumber;
		lineStart = scanner.lineStart;
		start = scanner.index;

		while ((char = scanner.read())) {
			code += char;

			if (char === "\"" && prevChar !== "\\") {
				break;
			}

			prevChar = char;
		}
	}

	if (code !== "") {
		const newTokens = tokenize(code, {
			indexOffset: start,
			lineNumberOffset: lineNumber,
			lineStartOffset: lineStart
		});

		for (const token of newTokens) {
			if (token.type === Buffer) {
				token.type = Literal;
			}
		}

		return newTokens;
	}
}

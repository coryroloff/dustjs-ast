"use strict";

import tokenize from "./tokenize";

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
		let newTokens = tokenize(code, {
			indexOffset: start,
			lineNumberOffset: lineNumber,
			lineStartOffset: lineStart
		});

		for (let token of newTokens) {
			if (token.type === "Buffer") {
				token.type = "Literal";
			}
		}

		return newTokens;
	}
}

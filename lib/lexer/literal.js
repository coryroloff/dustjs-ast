"use strict";

import tokenize from "./index";
import Token from "./token";

export default function scanLiteral (scanner) {
	if (scanner.char !== "\"") {
		return;
	}

	const lineNumber = scanner.lineNumber;
	const lineStart = scanner.lineStart;
	const start = scanner.index;

	let prevChar;
	let code = scanner.char;

	for (const char of scanner) {
		code += char;

		if (char === "\"" && prevChar !== "\\") {
			break;
		}

		prevChar = char;
	}

	const newTokens = tokenize(code, {
		indexOffset: start,
		lineNumberOffset: lineNumber,
		lineStartOffset: lineStart
	});

	for (const token of newTokens) {
		if (token.type === Token.Buffer) {
			token.type = Token.Literal;
		}
	}

	return newTokens;
}

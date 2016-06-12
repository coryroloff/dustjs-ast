"use strict";

export default function scanPunctuator (scanner) {
	let code = "";
	let punctuators = [
		".", "#", "^", "/", "@", "%", ">", "<",
		"+", "?", ":", "=", "|", "[", "]", "~"
	];

	if (punctuators.indexOf(scanner.char) !== -1) {
		code = scanner.char;
	}

	if (code != "") {
		return {
			type: "Punctuator",
			value: code,
			lineNumber: scanner.lineNumber,
			lineStart: scanner.lineStart,
			start: scanner.index,
			end: scanner.index + 1
		};
	}
}

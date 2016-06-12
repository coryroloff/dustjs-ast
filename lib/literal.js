"use strict";

export default function scanLiteral (scanner) {
	let char;
	let prevChar;
	let code = "";
	let lineNumber, lineStart, start, end;

	if (scanner.char == "\"") {
		code += scanner.char;

		lineNumber = scanner.lineNumber;
		lineStart = scanner.lineStart;
		start = scanner.index;

		while ((char = scanner.read())) {
			code += char;

			if (char == "\"" && prevChar != "\\") {
				end = scanner.index + 1;
				break;
			}

			prevChar = char;
		}
	}

	if (code != "") {
		return {
			type: "Literal",
			value: code,
			lineNumber,
			lineStart,
			start,
			end
		};
	}
}

"use strict";

export default function scanComment (scanner) {
	let char;
	let code = "";
	let lineNumber, lineStart, start, end;

	if (scanner.char === "!") {
		lineNumber = scanner.lineNumber;
		lineStart = scanner.lineStart;
		start = scanner.index - 1;

		while ((char = scanner.read())) {
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
			type: "Comment",
			value: code,
			lineNumber,
			lineStart,
			start,
			end
		};
	}
}

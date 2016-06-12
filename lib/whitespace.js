"use strict";

import {Whitespace} from "./token";

export default function scanWhitespace (scanner) {
	let char;
	let code = "";
	let whitespace = [
		" ", "\t", "\v", "\f", "\u00A0", "\uFEFF"
	];
	let lineNumber, lineStart, start, end;

	if (whitespace.indexOf(scanner.char) !== -1) {
		code += scanner.char;

		lineNumber = scanner.lineNumber;
		lineStart = scanner.lineStart;
		start = scanner.index;
		end = scanner.index + 1;

		if (whitespace.indexOf(scanner.peek()) !== -1) {
			while ((char = scanner.read())) {
				code += char;

				if (whitespace.indexOf(scanner.peek()) === -1) {
					end = scanner.index + 1;
					break;
				}
			}
		}
	}

	if (code !== "") {
		return {
			type: Whitespace,
			value: code,
			lineNumber,
			lineStart,
			start,
			end
		};
	}
}

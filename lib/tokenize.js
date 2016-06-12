"use strict";

import Scanner from "./scanner";
import scanComment from "./comment";
import scanIdentifier from "./identifier";
import scanWhitespace from "./whitespace";
import scanPunctuator from "./punctuator";
import scanLiteral from "./literal";
import finalize from "./finalize";

export default function tokenize (code) {
	let scanner = new Scanner(code);
	let tokens = [];
	let isSyntax = false;
	let char, buffer, lineNumber, lineStart, start;

	while ((char = scanner.read())) {
		if (char == "{") {
			tokens.push({
				type: "Punctuator",
				value: char,
				lineNumber: scanner.lineNumber,
				lineStart: scanner.lineStart,
				start: scanner.index,
				end: scanner.index + 1
			});

			isSyntax = true;
			continue;
		} else if (char == "}") {
			let lastToken = tokens[tokens.length - 1];

			if (lastToken.type !== "Comment") {
				tokens.push({
					type: "Punctuator",
					value: char,
					lineNumber: scanner.lineNumber,
					lineStart: scanner.lineStart,
					start: scanner.index,
					end: scanner.index + 1
				});
			}

			isSyntax = false;
			continue;
		}

		if (isSyntax) {
			if (buffer) {
				let lastToken = tokens.pop();

				tokens.push({
					type: "Buffer",
					value: buffer,
					lineNumber,
					lineStart,
					start,
					end: scanner.index - 1
				});

				tokens.push(lastToken);

				buffer = null;
			}

			let tokenFound = false;

			[
				scanComment,
				scanIdentifier,
				scanWhitespace,
				scanPunctuator,
				scanLiteral
			].forEach((scanFunction) => {
				let token = scanFunction(scanner);
				if (token) {
					if (token.type === "Comment") {
						tokens.pop();
					}

					tokens.push(token);
					tokenFound = true;
				}
			});

			if (!tokenFound) {
				throw new Error(`unexpected character: ${char}`);
			}
		} else {
			if (!buffer) {
				buffer = "";
				lineNumber = scanner.lineNumber;
				lineStart = scanner.lineStart;
				start = scanner.index;
			}

			buffer += char;

			if (scanner.peek() === undefined) {
				tokens.push({
					type: "Buffer",
					value: buffer,
					lineNumber,
					lineStart,
					start,
					end: scanner.index + 1
				});
			}
		}
	}

	finalize(tokens, scanner);

	return tokens;
}

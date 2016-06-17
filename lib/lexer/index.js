"use strict";

import Scanner from "./scanner";
import scanComment from "./comment";
import scanKey from "./key";
import scanWhitespace from "./whitespace";
import scanPunctuator from "./punctuator";
import scanLiteral from "./literal";
import finalize from "./finalize";
import {Punctuator, Comment, Buffer} from "./token";

export default function tokenize (code, options) {
	const scanner = new Scanner(code, options);
	let tokens = [];
	let isSyntax = false;
	let prevChar, buffer, lineNumber, lineStart, start;

	for (const char of scanner) {
		if (char === "{" && prevChar !== "\\") {
			tokens.push({
				type: Punctuator,
				value: char,
				lineNumber: scanner.lineNumber,
				lineStart: scanner.lineStart,
				start: scanner.index,
				end: scanner.index + 1
			});

			isSyntax = true;
			continue;
		} else if (char === "}" && prevChar !== "\\") {
			const lastToken = tokens[tokens.length - 1];

			if (lastToken.type !== Comment) {
				tokens.push({
					type: Punctuator,
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
				const lastToken = tokens.pop();

				tokens.push({
					type: Buffer,
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
				scanKey,
				scanWhitespace,
				scanPunctuator,
				scanLiteral
			].forEach((scanFunction) => {
				const token = scanFunction(scanner);
				if (token) {
					if (token.type === Comment) {
						tokens.pop();
					}

					if (Array.isArray(token)) {
						tokens = tokens.concat(token);
					} else {
						tokens.push(token);
					}

					tokenFound = true;
				}
			});

			if (!tokenFound) {
				throw new Error(`Unexpected character: ${char}`);
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
					type: Buffer,
					value: buffer,
					lineNumber,
					lineStart,
					start,
					end: scanner.index + 1
				});
			}
		}

		prevChar = char;
	}

	finalize(tokens, scanner);

	return tokens;
}

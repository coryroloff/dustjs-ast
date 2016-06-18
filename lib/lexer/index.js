"use strict";

import Scanner from "./scanner";
import scanComment from "./comment";
import scanKey from "./key";
import scanWhitespace from "./whitespace";
import scanPunctuator from "./punctuator";
import scanLiteral from "./literal";
import finalize from "./finalize";
import Token from "./token";

export default function tokenize (code, options) {
	const scanner = new Scanner(code, options);
	let tokens = [];
	let isSyntax = false;
	let prevChar, buffer, lineNumber, lineStart, start;

	for (const char of scanner) {
		if (char === "{" && prevChar !== "\\") {
			const token = new Token(Token.Punctuator, char);
			token.configure(scanner);
			tokens.push(token);
			isSyntax = true;
			continue;
		} else if (char === "}" && prevChar !== "\\") {
			const lastToken = tokens[tokens.length - 1];

			if (lastToken.type !== Token.Comment) {
				const token = new Token(Token.Punctuator, char);
				token.configure(scanner);
				tokens.push(token);
			}

			isSyntax = false;
			continue;
		}

		if (isSyntax) {
			if (buffer) {
				const lastToken = tokens.pop();
				const token = new Token(Token.Buffer, buffer);

				token.lineNumber = lineNumber;
				token.lineStart = lineStart;
				token.start = start;
				token.end = scanner.index - 1;

				tokens.push(token, lastToken);

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
					if (token.type === Token.Comment) {
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
				const token = new Token(Token.Buffer, buffer);
				token.lineNumber = lineNumber;
				token.lineStart = lineStart;
				token.start = start;
				token.end = scanner.index + 1;
				tokens.push(token);
			}
		}

		prevChar = char;
	}

	finalize(tokens, scanner);

	return tokens;
}

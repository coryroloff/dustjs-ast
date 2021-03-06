// @flow

import Scanner from "./scanner";
import scanComment from "./comment";
import scanKey from "./key";
import scanFormat from "./format";
import scanPunctuator from "./punctuator";
import scanStringLiteral from "./string-literal";
import scanNumericLiteral from "./numeric-literal";
import scanRaw from "./raw";
import finalize from "./finalize";
import Token from "./token";
import {format} from "./format";

export default function lexer (code: string, options: Object): Array<Token> {
	const scanner = new Scanner(code, options);
	let tokens = [];
	let isSyntax = false;
	let buffer: ?string, line: ?number, lineStart: ?number, start: ?number;

	// $FlowIssue
	for (const char of scanner) {
		if (char === "{" && ["\"", "'"].concat(format).indexOf(scanner.peek()) === -1) {
			const token = new Token(Token.Punctuator, char);
			token.configure(scanner);
			tokens.push(token);
			isSyntax = true;
			continue;
		} else if (char === "}" && isSyntax) {
			const lastToken = tokens[tokens.length - 1];

			if (lastToken.type !== Token.Comment && lastToken.type !== Token.Raw) {
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

				token.line = line || 0;
				token.lineStart = lineStart || 0;
				token.start = start || 0;

				tokens.push(token, lastToken);

				buffer = null;
			}

			let tokenFound = false;

			const scanFunctions = [
				scanComment,
				scanKey,
				scanFormat,
				scanPunctuator,
				scanStringLiteral,
				scanNumericLiteral,
				scanRaw
			];

			for (const scanFunction of scanFunctions) {
				const token: ?Token | Array<Token> = scanFunction(scanner);

				if (token) {
					if (Array.isArray(token)) {
						tokens = tokens.concat(token);
					} else {
						if (token.type === Token.Comment || token.type === Token.Raw) {
							tokens.pop();
						}

						tokens.push(token);
					}

					tokenFound = true;

					break;
				}
			}

			if (!tokenFound) {
				throw new Error(`Unexpected character: ${char}`);
			}
		} else {
			if (scanner.isLineTerminator(char)) {
				if (buffer) {
					const token = new Token(Token.Buffer, buffer);
					token.line = line || 0;
					token.lineStart = lineStart || 0;
					token.start = start || 0;
					tokens.push(token);
					buffer = null;
				}

				const format = scanFormat(scanner);

				if (format) {
					tokens.push(format);
				}

			} else if (!buffer) {
				buffer = char;
				line = scanner.line;
				lineStart = scanner.lineStart;
				start = scanner.index;
			} else {
				buffer += char;
			}

			if (buffer && scanner.peek() === "") {
				const token = new Token(Token.Buffer, buffer);
				token.line = line || 0;
				token.lineStart = lineStart || 0;
				token.start = start || 0;
				tokens.push(token);
			}
		}
	}

	const eof = new Token("EOF");
	eof.configure(scanner);
	tokens.push(eof);

	finalize(tokens, scanner);

	return tokens;
}

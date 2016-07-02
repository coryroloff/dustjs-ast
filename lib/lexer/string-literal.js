// @flow

import Scanner from "./scanner";
import Token from "./token";
import tokenize from "./index";

export default function scanStringLiteral (scanner: Scanner): ?Array<Token> {
	if (scanner.char !== "\"") {
		return;
	}

	const startToken = new Token(Token.Punctuator, scanner.char);
	const endToken = new Token(Token.Punctuator, scanner.char);

	startToken.configure(scanner);

	const nextToken = scanner.next();
	const line = scanner.line;
	const lineStart = scanner.lineStart;
	const start = scanner.index;

	let escaping = false;
	let code = nextToken.value;

	if (code === "\"") {
		const endToken = new Token(Token.Punctuator, code);
		endToken.configure(scanner);
		return [startToken, endToken];
	}

	// $FlowIssue
	for (const char of scanner) {
		if (!escaping && char === "\\") {
			escaping = true;
			code += char;
		} else if (!escaping && char === "\"") {
			endToken.configure(scanner);
			break;
		} else {
			code += char;
			escaping = false;
		}
	}

	const newTokens = tokenize(code, {
		indexOffset: start,
		lineOffset: line,
		lineStartOffset: lineStart
	});

	for (const token of newTokens) {
		if (token.type === Token.Buffer) {
			token.type = Token.StringLiteral;

			let escaping = false;
			let code = "";

			for (const char of token.value) {
				if (!escaping && char === "\\") {
					escaping = true;
				} else {
					code += escaping ? JSON.parse(`"\\${char}"`) : char;
					escaping = false;
				}
			}

			token.value = code;
		}
	}

	newTokens.unshift(startToken);
	newTokens.push(endToken);

	return newTokens;
}

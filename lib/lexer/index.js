import Scanner from "./scanner";
import scanComment from "./comment";
import scanKey from "./key";
import scanFormat from "./format";
import scanPunctuator from "./punctuator";
import scanLiteral from "./literal";
import scanRaw from "./raw";
import finalize from "./finalize";
import Token from "./token";

export default function lexer (code, options) {
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

				token.lineNumber = lineNumber;
				token.lineStart = lineStart;
				token.start = start;

				tokens.push(token, lastToken);

				buffer = null;
			}

			let tokenFound = false;

			[
				scanComment,
				scanKey,
				scanFormat,
				scanPunctuator,
				scanLiteral,
				scanRaw
			].forEach((scanFunction) => {
				const token = scanFunction(scanner);

				if (token) {
					if (token.type === Token.Comment || token.type === Token.Raw) {
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
				buffer = char;
				lineNumber = scanner.lineNumber;
				lineStart = scanner.lineStart;
				start = scanner.index;

				if (scanner.isLineTerminator(buffer)) {
					start++;
				}
			} else {
				buffer += char;
			}

			if (scanner.peek() === undefined) {
				const token = new Token(Token.Buffer, buffer);
				token.lineNumber = lineNumber;
				token.lineStart = lineStart;
				token.start = start;
				tokens.push(token);
			}
		}

		prevChar = char;
	}

	const eof = new Token("EOF");
	eof.configure(scanner);
	tokens.push(eof);

	finalize(tokens, scanner);

	return tokens;
}

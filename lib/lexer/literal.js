import tokenize from "./index";
import Token from "./token";

export default function scanLiteral (scanner) {
	if (scanner.char !== "\"" && !/[0-9]/.test(scanner.char)) {
		return;
	}

	const lineNumber = scanner.lineNumber;
	const lineStart = scanner.lineStart;
	const start = scanner.index;
	const numberOnly = /[0-9]/.test(scanner.char);

	if (!numberOnly) {
		let prevChar;
		let code = `${scanner.char}`;

		for (const char of scanner) {
			code += char;

			if (char === "\"" && prevChar !== "\\") {
				break;
			}

			prevChar = char;
		}

		const newTokens = tokenize(code, {
			indexOffset: start,
			lineNumberOffset: lineNumber,
			lineStartOffset: lineStart
		});

		for (const token of newTokens) {
			if (token.type === Token.Buffer) {
				token.type = Token.Literal;
			}
		}

		return newTokens;
	} else {
		const token = new Token(Token.Literal, scanner.char);

		if (/[0-9.]/.test(scanner.peek())) {
			for (const char of scanner) {
				token.value += char;

				if (!/[0-9.]/.test(scanner.peek())) {
					break;
				}
			}
		}

		token.configure(scanner);

		return token;
	}
}

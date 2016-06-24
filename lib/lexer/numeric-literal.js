import Token from "./token";

export default function scanNumericLiteral (scanner) {
	if (!/[0-9]/.test(scanner.char)) {
		return;
	}

	const token = new Token(Token.NumericLiteral, scanner.char);
	token.configure(scanner);

	if (/[0-9.]/.test(scanner.peek())) {
		for (const char of scanner) {
			token.value += char;

			if (!/[0-9.]/.test(scanner.peek())) {
				break;
			}
		}
	}

	return token;
}

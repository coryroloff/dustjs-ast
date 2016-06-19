import Token from "./token";

const whitespace = [" ", "\t", "\v", "\f", "\u00A0", "\uFEFF"];

export default function scanWhitespace (scanner) {
	if (whitespace.indexOf(scanner.char) === -1) {
		return;
	}

	const token = new Token(Token.Whitespace, scanner.char);
	token.configure(scanner);

	if (whitespace.indexOf(scanner.peek()) !== -1) {
		for (const char of scanner) {
			token.value += char;

			if (whitespace.indexOf(scanner.peek()) === -1) {
				break;
			}
		}
	}

	return token;
}

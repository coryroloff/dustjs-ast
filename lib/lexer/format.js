import Token from "./token";

const format = [" ", "\t", "\v", "\f", "\u00A0", "\uFEFF"];

export default function scanFormat (scanner) {
	if (format.indexOf(scanner.char) === -1) {
		return;
	}

	const token = new Token(Token.Format, scanner.char);
	token.configure(scanner);

	if (format.indexOf(scanner.peek()) !== -1) {
		for (const char of scanner) {
			token.value += char;

			if (format.indexOf(scanner.peek()) === -1) {
				break;
			}
		}
	}

	return token;
}

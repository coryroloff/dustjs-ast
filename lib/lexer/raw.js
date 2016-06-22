import Token from "./token";

export default function scanRaw (scanner) {
	if (scanner.char !== "`") {
		return;
	}

	const token = new Token(Token.Raw);
	token.configure(scanner);
	token.start = scanner.index - 1;

	for (const char of scanner) {
		if (char === "`" && scanner.peek() === "}") {
			break;
		}

		token.value += char;
	}

	return token;
}

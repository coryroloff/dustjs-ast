export default function scanIdentifier (scanner) {
	let char;
	let code = "";
	let lineNumber, lineStart, start, end;

	if (/[a-zA-Z_$]/.test(scanner.char)) {
		code += scanner.char;

		lineNumber = scanner.lineNumber;
		lineStart = scanner.lineStart;
		start = scanner.index;
		end = start + 1;

		if (/[0-9a-zA-Z_$-]/.test(scanner.peek())) {
			while ((char = scanner.read())) {
				code += char;

				if (!/[0-9a-zA-Z_$-]/.test(scanner.peek())) {
					end = scanner.index + 1;
					break;
				}
			}
		}
	}

	if (code != "") {
		return {
			type: "Identifier",
			value: code,
			lineNumber,
			lineStart,
			start,
			end
		};
	}
}

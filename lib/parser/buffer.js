import Node from "./node";
import Token from "../lexer/token";

export default class Buffer extends Node {
	constructor () {
		super();
		
		this.type = Node.Buffer;
	}

	parse (reader) {
		const token = reader.next().value;

		if (token.type !== Token.Buffer) {
			reader.throwUnexpectedToken(token);
		}

		this.text = token.value;
		this.finalize(token, token);

		return this;
	}
}

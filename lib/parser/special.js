import Node from "./node";
import Token from "../lexer/token";
import Key from "./key";

export default class Speical extends Node {
	constructor () {
		super();

		this.type = Node.Special;
	}

	parse (reader) {
		const specials = ["s", "n", "r", "lb", "rb"];

		const startToken = reader.expect("{");

		reader.expect("~");

		const token = reader.peek().value;

		if (token.type !== Token.Key || specials.indexOf(token.value) === -1) {
			reader.throwUnexpectedToken(token);
		}

		this.key = new Key().parse(reader);

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}
}

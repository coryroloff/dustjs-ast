import Node from "./node";
import Key from "./key";
import parseNode from "./parse-node";

export default class Speical extends Node {
	static test (reader) {
		const lb = reader.match("{");
		reader.next();
		const special = reader.matchSpecial();
		reader.prev();
		return lb && special;
	}

	constructor () {
		super();

		this.type = Node.Special;
	}

	parse (reader) {
		const specials = ["s", "n", "r", "lb", "rb"];

		const startToken = reader.expect("{");

		reader.expect("~");

		const token = reader.peek().value;

		this.key = parseNode(reader, [Key]);

		if (specials.indexOf(this.key.name) === -1) {
			reader.throwUnexpectedToken(token);
		}

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}
}

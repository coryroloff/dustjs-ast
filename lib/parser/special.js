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
		const startToken = reader.expect("{");
		reader.expect("~");
		this.key = parseNode(reader, [Key]);
		const endToken = reader.expect("}");
		this.finalize(startToken, endToken);
		return this;
	}
}

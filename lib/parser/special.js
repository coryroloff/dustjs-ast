import Key from "./key";
import Node from "./node";
import Reader from "./reader";
import parseNode from "./parse-node";

export default class Speical extends Node {
	static test (reader: Reader): boolean {
		const lb = reader.match("{");
		reader.next();
		const special = reader.matchSpecial();
		reader.prev();
		return lb && special;
	}

	key: Key;

	constructor (): void {
		super();
		this.type = Node.Special;
	}

	parse (reader: Reader) {
		const startToken = reader.expect("{");
		reader.expect("~");
		this.key = parseNode(reader, [Key]);
		const endToken = reader.expect("}");
		this.finalize(startToken, endToken);
		return this;
	}
}

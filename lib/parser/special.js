// @flow

import Key from "./key";
import Node from "./node";
import Reader from "./reader";

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

	parse (reader: Reader): this {
		super.parse(reader);
		const startToken = reader.expect("{");
		reader.expect("~");
		this.key = new Key().parse(reader);
		const endToken = reader.expect("}");
		this.finalize(startToken, endToken);
		return this;
	}
}

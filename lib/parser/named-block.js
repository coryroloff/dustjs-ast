// @flow

import Block from "./block";
import Key from "./key";
import Node from "./node";
import Reader from "./reader";

export default class NamedBlock extends Block {
	static test (reader: Reader): boolean {
		const lb = reader.match("{");
		reader.next();
		const colon = reader.match(":");
		reader.next();
		const key = Key.test(reader);
		reader.prev();
		reader.prev();
		return lb && colon && key;
	}

	key: Key;

	constructor (): void {
		super();
		this.type = Node.NamedBlock;
	}

	parse (reader: Reader): this {
		super.parse(reader);
		this.startToken = reader.expect("{");
		reader.expect(":");
		this.key = new Key().parse(reader);
		const endToken = reader.expect("}");
		this.finalize(this.startToken, endToken);
		super.parse(reader);
		return this;
	}
}

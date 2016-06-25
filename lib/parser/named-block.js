import Node from "./node";
import Block from "./block";
import Key from "./key";
import parseNode from "./parse-node";

export default class NamedBlock extends Block {
	static test (reader) {
		const lb = reader.match("{");
		reader.next();
		const colon = reader.match(":");
		reader.next();
		const key = Key.test(reader);
		reader.prev();
		reader.prev();
		return lb && colon && key;
	}

	constructor () {
		super();

		this.type = Node.NamedBlock;
		this.key = null;
	}

	parse (reader) {
		this.startToken = reader.expect("{");
		reader.expect(":");
		this.key = parseNode(reader, [Key]);
		const endToken = reader.expect("}");
		this.finalize(this.startToken, endToken);
		super.parse(reader);
		return this;
	}

	set (target, propertyKey, value) {
		target[propertyKey] = value;
		this.finalize(this.startToken, this.body[this.body.length - 1]);
		return true;
	}
}

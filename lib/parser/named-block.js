import Node from "./node";
import Block from "./block";
import Key from "./key";

export default class NamedBlock extends Block {
	constructor () {
		super();

		this.type = Node.NamedBlock;
		this.key = null;
	}

	parse (reader) {
		reader.expect(":");
		this.key = new Key().parse(reader);
		reader.expect("}");

		return this;
	}
}

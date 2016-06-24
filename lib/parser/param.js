import Node from "./node";
import Key from "./key";
import Identifier from "./identifier";
import Inline from "./inline";
import NumericLiteral from "./numeric-literal";
import parseNode from "./parse-node";

export default class Param extends Node {
	static test (reader) {
		const key = Key.test(reader);
		reader.next();
		const equals = reader.match("=");
		reader.prev();
		return key && equals;
	}

	constructor () {
		super();
		this.type = Node.Param;
		this.key = null;
		this.value = null;
	}

	parse (reader) {
		this.key = parseNode(reader, [Key]);
		reader.expect("=");
		this.value = parseNode(reader, [Identifier, Inline, NumericLiteral]);
		this.finalize(this.key, this.value);
		return this;
	}
}

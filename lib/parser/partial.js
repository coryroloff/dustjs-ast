import Node from "./node";
import Key from "./key";
import Inline from "./inline";
import Literal from "./literal";
import Identifier from "./identifier";
import Param from "./param";
import parseNode from "./parse-node";

export default class Partial extends Node {
	static test (reader) {
		const lb = reader.match("{");
		reader.next();
		const partial = reader.match(">");
		reader.prev();
		return lb && partial;
	}

	constructor () {
		super();

		this.type = Node.Partial;
		this.value = null;
		this.context = null;
		this.params = [];
	}

	parse (reader) {
		const startToken = reader.expect("{");

		reader.expect(">");

		this.value = parseNode(reader, [Key, Inline, Literal]);

		if (reader.match(":")) {
			reader.expect(":");
			this.context = parseNode(reader, [Identifier]);
		}

		this.parseParams(reader);

		reader.expect("/");

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}

	parseParams (reader) {
		if (Param.test(reader)) {
			this.params.push(parseNode(reader, [Param]));
			this.parseParams(reader);
		}
	}
}

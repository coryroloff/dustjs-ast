import Node from "./node";
import Key from "./key";
import Inline from "./inline";
import Identifier from "./identifier";
import Param from "./param";
import parseNode from "./parse-node";
import Format from "./format";

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

		if (Format.test(reader)) {
			parseNode(reader, [Format]);
		}

		this.value = parseNode(reader, [Key, Inline]);

		if (reader.match(":")) {
			reader.expect(":");
			this.context = parseNode(reader, [Identifier]);
		}

		this.parseParams(reader);

		if (Format.test(reader)) {
			parseNode(reader, [Format]);
		}

		reader.expect("/");

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}

	parseParams (reader) {
		if (Format.test(reader)) {
			parseNode(reader, [Format]);
		}

		if (Param.test(reader)) {
			this.params.push(parseNode(reader, [Param]));
			this.parseParams(reader);
		}
	}
}

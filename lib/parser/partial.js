import Node from "./node";
import Key from "./key";
import Inline from "./inline";
import Identifier from "./identifier";
import Param from "./param";
import parseNode from "./parse-node";
import Format from "./format";

export default class Partial extends Node {
	static get Partial () { return "Partial"; }
	static get Block () { return "Block"; }

	static test (reader) {
		const lb = reader.match("{");
		reader.next();
		const partial = reader.match(">");
		const block = reader.match("+");
		reader.next();
		const format = Format.test(reader);
		if (format) {
			reader.next();
		}
		const valid = (block && !Inline.test(reader)) ? false : true;
		reader.prev();
		reader.prev();
		if (format) {
			reader.prev();
		}
		return lb && (partial || block) && valid;
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

		this.kind = reader.expectPartial().value;

		this.parseFormat(reader);

		this.value = parseNode(reader, [Key, Inline]);

		if (reader.match(":")) {
			reader.expect(":");
			this.context = parseNode(reader, [Identifier]);
		}

		this.parseParams(reader);

		this.parseFormat(reader);

		reader.expect("/");

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}

	parseFormat (reader) {
		if (Format.test(reader)) {
			const prevToken = reader.token;
			const format = reader.peek().value;
			parseNode(reader, [Format]);
			if (reader.peek().value.loc.start.line !== prevToken.loc.start.line) {
				reader.throwUnexpectedToken(format);
			}
		}
	}

	parseParams (reader) {
		this.parseFormat(reader);

		if (Param.test(reader)) {
			this.params.push(parseNode(reader, [Param]));
			this.parseParams(reader);
		}
	}
}

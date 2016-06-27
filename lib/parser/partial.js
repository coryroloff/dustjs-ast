import Node from "./node";
import Key from "./key";
import Inline from "./inline";
import Identifier from "./identifier";
import Param from "./param";
import parseNode from "./parse-node";
import Format from "./format";

export default class Partial extends Node {
	static get /* istanbul ignore next */ Partial () { return "Partial"; }
	static get /* istanbul ignore next */ Block () { return "Block"; }

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
		const valid = !(block && !Inline.test(reader));
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
		this.format = {
			afterStart: null,
			beforeParam: [],
			beforeEnd: null
		};
		this.params = [];
	}

	parse (reader) {
		const startToken = reader.expect("{");

		this.kind = reader.expectPartial().value;

		this.format.afterStart = this.parseFormat(reader);

		this.value = parseNode(reader, [Key, Inline]);

		if (reader.match(":")) {
			reader.expect(":");
			this.context = parseNode(reader, [Identifier]);
		}

		this.parseParams(reader);

		this.format.beforeEnd = this.parseFormat(reader);

		reader.expect("/");

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}

	parseFormat (reader) {
		if (Format.test(reader)) {
			const prevToken = reader.token;
			const format = reader.peek().value;
			const node = parseNode(reader, [Format]);
			if (reader.peek().value.loc.start.line !== prevToken.loc.start.line) {
				reader.throwUnexpectedToken(format);
			}
			return node;
		} else {
			return null;
		}
	}

	parseParams (reader) {
		const format = Format.test(reader);

		if (format) {
			this.format.beforeParam.push(this.parseFormat(reader));
		}

		if (Param.test(reader)) {
			if (!format && this.params.length !== 0) {
				reader.throwUnexpectedToken(reader.peek().value);
			}

			this.params.push(parseNode(reader, [Param]));
			this.parseParams(reader);
		} else if (format) {
			this.format.beforeParam.pop();
			reader.prev();
		}
	}
}

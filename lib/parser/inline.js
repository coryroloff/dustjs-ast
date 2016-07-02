// @flow

import Block from "./block";
import Node from "./node";
import NumericLiteral from "./numeric-literal";
import Reader from "./reader";
import Reference from "./reference";
import Special from "./special";
import StringLiteral from "./string-literal";
import parseNode from "./parse-node";

export default class Inline extends Block {
	static test (reader: Reader): boolean {
		return reader.match("\"");
	}

	body: Array<Special | Reference | StringLiteral | NumericLiteral>;

	constructor (): void {
		super();

		this.type = Node.Inline;
	}

	parse (reader: Reader): this {
		const startToken = reader.expect("\"");

		while (!reader.peek().done) {
			if (reader.match("\"")) {
				this.finalize(startToken, reader.next().value);
				break;
			} else {
				const node = parseNode(reader, [Special, Reference, StringLiteral, NumericLiteral]);
				this.body.push(node);
			}
		}

		return this;
	}
}

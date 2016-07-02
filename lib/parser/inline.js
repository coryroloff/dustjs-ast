// @flow

import Node from "./node";
import NumericLiteral from "./numeric-literal";
import Reader from "./reader";
import Reference from "./reference";
import Special from "./special";
import StringLiteral from "./string-literal";

export default class Inline extends Node {
	static test (reader: Reader): boolean {
		return reader.match("\"");
	}

	body: Array<Special | Reference | StringLiteral | NumericLiteral>;

	constructor (): void {
		super();

		this.type = Node.Inline;
		this.body = [];
	}

	parse (reader: Reader): this {
		super.parse(reader);

		const startToken = reader.expect("\"");

		while (!reader.peek().done) {
			if (reader.match("\"")) {
				this.finalize(startToken, reader.next().value);
				break;
			} else {
				if (Special.test(reader)) {
					this.body.push(new Special().parse(reader));
				} else if (Reference.test(reader)) {
					this.body.push(new Reference().parse(reader));
				} else if (StringLiteral.test(reader)) {
					this.body.push(new StringLiteral().parse(reader));
				} else if (NumericLiteral.test(reader)) {
					this.body.push(new NumericLiteral().parse(reader));
				} else {
					reader.throwUnexpectedToken(reader.peek().value);
				}
			}
		}

		return this;
	}
}

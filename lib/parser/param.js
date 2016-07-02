// @flow

import Identifier from "./identifier";
import Inline from "./inline";
import Key from "./key";
import Node from "./node";
import NumericLiteral from "./numeric-literal";
import Reader from "./reader";

export default class Param extends Node {
	static test (reader: Reader): boolean {
		const key = Key.test(reader);
		reader.next();
		const equals = reader.match("=");
		reader.prev();
		return key && equals;
	}

	key: Key;
	value: Identifier | Inline | NumericLiteral;

	constructor (): void {
		super();
		this.type = Node.Param;
	}

	parse (reader: Reader): this {
		super.parse(reader);
		this.key = new Key().parse(reader);
		reader.expect("=");

		if (Identifier.test(reader)) {
			this.value = new Identifier().parse(reader);
		} else if (Inline.test(reader)) {
			this.value = new Inline().parse(reader);
		} else if (NumericLiteral.test(reader)) {
			this.value = new NumericLiteral().parse(reader);
		} else {
			reader.throwUnexpectedToken(reader.peek().value);
		}

		this.finalize(this.key.startToken, this.value.endToken);
		
		return this;
	}
}

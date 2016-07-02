// @flow

import Identifier from "./identifier";
import Inline from "./inline";
import Key from "./key";
import Node from "./node";
import NumericLiteral from "./numeric-literal";
import Reader from "./reader";
import parseNode from "./parse-node";

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
		this.key = parseNode(reader, [Key]);
		reader.expect("=");
		this.value = parseNode(reader, [Identifier, Inline, NumericLiteral]);
		this.finalize(this.key.startToken, this.value.endToken);
		return this;
	}
}

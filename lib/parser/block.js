// @flow

import Node from "./node";
import Reader from "./reader";

export default class Block extends Node {
	static test (reader: Reader): boolean { // eslint-disable-line no-unused-vars
		return true;
	}

	body: Array<Node>;

	constructor (): void {
		super();

		this.type = Node.Block;
		this.body = [];
	}

	parse (reader: Reader): this { // eslint-disable-line no-unused-vars
		super.parse(reader);
		return this;
	}
}

import Node from "./node";

export default class Block extends Node {
	static test () {
		return true;
	}

	constructor () {
		super();

		this.type = Node.Block;
		this.body = [];
	}

	parse () {
		return this;
	}
}

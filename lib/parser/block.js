import Node from "./node";

export default class Block extends Node {
	constructor () {
		super();

		this.type = Node.Block;
		this.body = [];
	}

	parse () {
		this.body = new Proxy(this.body, this);
		return this;
	}

	set (target, propertyKey, value) {
		target[propertyKey] = value;
		this.finalize(this.body[0], this.body[this.body.length - 1]);
		return true;
	}
}

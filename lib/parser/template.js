import Node from "./node";

export default class Template extends Node {
	constructor () {
		super();

		this.body = [];
		this.tokens = [];
	}

	parse (reader) {
		this.tokens = [].concat(reader.tokens);
		this.finalize(this.tokens[0], this.tokens[this.tokens.length - 1]);
		return this;
	}
}

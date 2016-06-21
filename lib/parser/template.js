import Node from "./node";
import Block from "./block";

export default class Template extends Block {
	constructor () {
		super();

		this.type = Node.Template;
		this.tokens = [];
	}

	parse (reader) {
		this.tokens = [].concat(reader.tokens);
		this.finalize(this.tokens[0], this.tokens[this.tokens.length - 1]);
		return this;
	}
}

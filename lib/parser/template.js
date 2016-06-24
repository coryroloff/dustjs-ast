import Node from "./node";
import Block from "./block";
import parseNode from "./parse-node";

export default class Template extends Block {
	constructor () {
		super();

		this.type = Node.Template;
		this.tokens = [];
	}

	parse (reader) {
		this.tokens = [].concat(reader.tokens);

		while (!reader.peek().done) {
			this.body.push(parseNode(reader));
		}

		this.finalize(this.tokens[0], this.tokens[this.tokens.length - 1]);

		return this;
	}
}

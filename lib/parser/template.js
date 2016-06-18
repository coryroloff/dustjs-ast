import Node from "./node";

export default class Template extends Node {
	static parse (reader) {
		const template = new Template();
		const tokens = reader.tokens;
		template.finalize(tokens[0], tokens[tokens.length - 1]);
		return template;
	}

	constructor () {
		super();

		this.body = [];
	}
}

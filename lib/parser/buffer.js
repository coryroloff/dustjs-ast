import Node from "./node";

export default class Buffer extends Node {
	constructor () {
		super();

		this.type = Node.Buffer;
	}

	parse (reader) {
		const token = reader.next().value;

		this.text = token.value;
		this.finalize(token, token);

		return this;
	}
}

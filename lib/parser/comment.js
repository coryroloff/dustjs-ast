import Node from "./node";

export default class Comment extends Node {
	constructor () {
		super();

		this.type = Node.Comment;
	}

	parse (reader) {
		const token = reader.next().value;

		this.text = token.value;
		this.finalize(token, token);

		return this;
	}
}

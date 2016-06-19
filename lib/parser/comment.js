import Node from "./node";
import Token from "../lexer/token";

export default class Comment extends Node {
	constructor () {
		super();

		this.type = Node.Comment;
	}

	parse (reader) {
		const token = reader.next().value;

		if (token.type !== Token.Comment) {
			reader.throwUnexpectedToken(token);
		}

		this.text = token.value;
		this.finalize(token, token);

		return this;
	}
}

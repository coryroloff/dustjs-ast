import Node from "./node";
import Token from "../lexer/token";
import Block from "./block";
import Special from "./special";
import Reference from "./reference";
import Literal from "./literal";
import parseNode from "./parse-node";

export default class Inline extends Block {
	static test (reader) {
		const literal = Literal.test(reader);
		const token = reader.peek().value;
		return literal && token.value === "\"" || (token.value.startsWith("\"") && !token.value.endsWith("\""));
	}

	constructor () {
		super();

		this.type = Node.Inline;
	}

	parse (reader) {
		const startToken = reader.expectType(Token.Literal);

		this.body.push(startToken);

		while (!reader.peek().done) {
			const node = parseNode(reader, [Special, Reference, Literal]);

			this.body.push(node);

			if (node.type === Node.Literal && typeof node.value === "string" && node.value.endsWith("\"")) {
				break;
			}
		}

		this.finalize(this.body[0], this.body[this.body.length - 1]);

		return this;
	}
}

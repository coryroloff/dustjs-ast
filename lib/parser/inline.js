import Node from "./node";
import Token from "../lexer/token";
import Block from "./block";
import Special from "./special";
import Reference from "./reference";
import Literal from "./literal";

export default class Inline extends Block {
	constructor () {
		super();

		this.type = Node.Inline;
	}

	parse (reader) {
		const startToken = reader.expectType(Token.Literal);

		this.body.push(startToken);

		while (!reader.peek().done) {
			const token = reader.peek().value;

			if (reader.match("{")) {
				reader.expect("{");

				if (reader.match("~")) {
					reader.prev();
					this.body.push(new Special().parse(reader));
				} else if (reader.matchType(Token.Key)) {
					reader.prev();
					this.body.push(new Reference().parse(reader));
				}
			} else if (reader.matchType(Token.Literal)) {
				this.body.push(new Literal().parse(reader));

				if (typeof token.value === "string" && token.value.endsWith("\"")) {
					break;
				}
			} else {
				reader.throwUnexpectedToken(token);
			}
		}

		this.finalize(this.body[0], this.body[this.body.length - 1]);

		return this;
	}
}

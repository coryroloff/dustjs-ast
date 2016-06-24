import Node from "./node";
import Block from "./block";
import Special from "./special";
import Reference from "./reference";
import StringLiteral from "./string-literal";
import NumericLiteral from "./numeric-literal";
import parseNode from "./parse-node";

export default class Inline extends Block {
	static test (reader) {
		return reader.match("\"");
	}

	constructor () {
		super();

		this.type = Node.Inline;
	}

	parse (reader) {
		const startToken = reader.expect("\"");

		while (!reader.peek().done) {
			const node = parseNode(reader, [Special, Reference, StringLiteral, NumericLiteral]);

			this.body.push(node);

			if (reader.match("\"")) {
				this.finalize(startToken, reader.next().value);
				break;
			}
		}

		return this;
	}
}

import Node from "./node";
import Key from "./key";
import Token from "../lexer/token";
import parseNode from "./parse-node";

export default class Identifier extends Node {
	static test (reader) {
		return reader.matchType(Token.Key);
	}

	constructor () {
		super();

		this.type = Node.Identifier;
		this.path = [];
	}

	parse (reader) {
		this.parseKeys(reader, false);
		this.finalize(this.path[0], this.path[this.path.length - 1]);

		return this;
	}

	parseKeys (reader, required) {
		const delimiter = ".";

		if (required || reader.match(delimiter)) {
			reader.expect(delimiter);
		}

		this.path.push(parseNode(reader, [Key]));

		if (reader.match(delimiter)) {
			this.parseKeys(reader, true);
		}
	}
}

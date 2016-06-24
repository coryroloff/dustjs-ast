import Node from "./node";
import Key from "./key";
import NumericLiteral from "./numeric-literal";
import Token from "../lexer/token";
import parseNode from "./parse-node";

export default class Identifier extends Node {
	static test (reader) {
		return reader.match(".") || reader.match("[") || reader.matchType(Token.Key);
	}

	constructor () {
		super();

		this.type = Node.Identifier;
		this.path = [];
		this.localContext = false;
	}

	parse (reader) {
		const startToken = reader.peek().value;
		let endToken = startToken;

		if (reader.match(".")) {
			reader.expect(".");
			this.localContext = true;
		}

		if (reader.match("[")) {
			endToken = this.parseIndex(reader);

			if (reader.match(".")) {
				endToken = this.parsePath(reader);
			}
		} else if (Key.test(reader)) {
			endToken = this.parseKey(reader);

			if (reader.match("[")) {
				endToken = this.parseIndex(reader);
			} else if (reader.match(".")) {
				endToken = this.parsePath(reader);
			}
		}

		this.finalize(startToken, endToken);

		return this;
	}

	parseKey (reader) {
		const token = reader.peek().value;
		this.path.push(parseNode(reader, [Key]));
		return token;
	}

	parseIndex (reader) {
		reader.expect("[");
		this.path.push(parseNode(reader, [NumericLiteral]));
		return reader.expect("]");
	}

	parsePath (reader) {
		let endToken;

		while (!reader.peek().done) {
			reader.expect(".");

			endToken = this.parseKey(reader);

			if (reader.match("[")) {
				endToken = this.parseIndex(reader);
			}

			if (!reader.match(".")) {
				return endToken;
			}
		}
	}
}

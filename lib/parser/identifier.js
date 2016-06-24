import Node from "./node";
import Key from "./key";
import Token from "../lexer/token";
import parseNode from "./parse-node";

export default class Identifier extends Node {
	static test (reader) {
		return reader.match(".") || reader.matchType(Token.Key);
	}

	constructor () {
		super();

		this.type = Node.Identifier;
		this.path = [];
		this.localScope = false;
	}

	parse (reader) {
		const startToken = reader.peek().value;

		if (reader.match(".")) {
			this.localScope = true;
			reader.expect(".");
		}

		if (Key.test(reader)) {
			this.parsePath(reader);
			this.finalize(startToken, this.path[this.path.length - 1]);
		} else {
			this.finalize(startToken, startToken);
		}

		return this;
	}

	parsePath (reader) {
		this.path.push(parseNode(reader, [Key]));

		if (reader.match(".")) {
			while (!reader.peek().done) {
				reader.expect(".");
				this.path.push(parseNode(reader, [Key]));
				if (!reader.match(".")) {
					break;
				}
			}
		}
	}
}

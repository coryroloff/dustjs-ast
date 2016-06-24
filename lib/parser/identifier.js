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
		if (reader.match(".")) {
			this.localScope = true;
			reader.expect(".");
		}

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

		this.finalize(this.path[0], this.path[this.path.length - 1]);

		return this;
	}
}

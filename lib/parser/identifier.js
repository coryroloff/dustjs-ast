// @flow

import Key from "./key";
import Node from "./node";
import NumericLiteral from "./numeric-literal";
import Reader from "./reader";
import Token from "../lexer/token";

export default class Identifier extends Node {
	static test (reader: Reader): boolean {
		return reader.match(".") || reader.match("[") || reader.matchType(Token.Key);
	}

	path: Array<Key | NumericLiteral>;
	localContext: boolean;

	constructor (): void {
		super();

		this.type = Node.Identifier;
		this.path = [];
		this.localContext = false;
	}

	parse (reader: Reader): this {
		super.parse(reader);
		
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

	parseKey (reader: Reader): Token {
		const token = reader.peek().value;

		if (Key.test(reader)) {
			this.path.push(new Key().parse(reader));
		}

		return token;
	}

	parseIndex (reader: Reader): Token {
		reader.expect("[");

		if (NumericLiteral.test(reader)) {
			this.path.push(new NumericLiteral().parse(reader));
		}

		return reader.expect("]");
	}

	parsePath (reader: Reader): Token {
		let endToken = reader.peek().value;

		while (!reader.peek().done) {
			reader.expect(".");

			endToken = this.parseKey(reader);

			if (reader.match("[")) {
				endToken = this.parseIndex(reader);
			}

			if (!reader.match(".")) {
				break;
			}
		}

		return endToken;
	}
}

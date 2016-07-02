// @flow

import Block from "./block";
import Node from "./node";
import Reader from "./reader";
import Token from "../lexer/token";
import parseNode from "./parse-node";

export default class Template extends Block {
	static test (): boolean {
		return true;
	}

	tokens: Array<Token>;

	constructor (): void {
		super();

		this.type = Node.Template;
		this.tokens = [];
	}

	parse (reader: Reader): this {
		this.tokens = [].concat(reader.tokens);

		while (!reader.peek().done) {
			this.body.push(parseNode(reader));
		}

		this.finalize(this.tokens[0], this.tokens[this.tokens.length - 1]);

		return this;
	}
}

// @flow

import Node from "./node";
import Reader from "./reader";
import Token from "../lexer/token";
import Buffer from "./buffer";
import Comment from "./comment";
import Format from "./format";
import Partial from "./partial";
import Raw from "./raw";
import Reference from "./reference";
import Section from "./section";
import Special from "./special";

export default class Template extends Node {
	static test (): boolean {
		return true;
	}

	body: Array<Node>;
	tokens: Array<Token>;

	constructor (): void {
		super();

		this.type = Node.Template;
		this.body = [];
		this.tokens = [];
	}

	parse (reader: Reader): this {
		super.parse(reader);

		this.tokens = [].concat(reader.tokens);

		while (!reader.peek().done) {
			const node = Template.parseBodyNode(reader);

			if (node) {
				this.body.push(node);
			}
		}

		if (this.tokens.length > 0) {
			this.finalize(this.tokens[0], this.tokens[this.tokens.length - 1]);
		} else {
			const token = new Token("");
			token.loc.start.line = 1;
			token.loc.end.line = 1;
			this.finalize(token);
		}

		return this;
	}

	static parseBodyNode (reader: Reader): Node | void {
		if (Comment.test(reader)) {
			return new Comment().parse(reader);
		} else if (Buffer.test(reader)) {
			return new Buffer().parse(reader);
		} else if (Raw.test(reader)) {
			return new Raw().parse(reader);
		} else if (Format.test(reader)) {
			return new Format().parse(reader);
		} else if (Reference.test(reader)) {
			return new Reference().parse(reader);
		} else if (Section.test(reader)) {
			return new Section().parse(reader);
		} else if (Special.test(reader)) {
			return new Special().parse(reader);
		} else if (Partial.test(reader)) {
			return new Partial().parse(reader);
		} else {
			reader.throwUnexpectedToken(reader.peek().value);
		}
	}
}

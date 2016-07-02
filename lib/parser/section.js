// @flow

import Block from "./block";
import Format from "./format";
import Identifier from "./identifier";
import Key from "./key";
import NamedBlock from "./named-block";
import Node from "./node";
import Param from "./param";
import Reader from "./reader";
import Template from "./template";
import Token from "../lexer/token";

export default class Section extends Node {
	static get /* istanbul ignore next */ Standard (): string { return "#"; }
	static get /* istanbul ignore next */ Exists (): string { return "?"; }
	static get /* istanbul ignore next */ NotExists (): string { return "^"; }
	static get /* istanbul ignore next */ InlinePartial (): string { return "<"; }
	static get /* istanbul ignore next */ Block (): string { return "+"; }
	static get /* istanbul ignore next */ Helper (): string { return "@"; }
	static get /* istanbul ignore next */ Pragma (): string { return "%"; }

	static test (reader: Reader): boolean {
		const lb = reader.match("{");
		reader.next();
		const kind = reader.matchSection();
		reader.next();
		const format = Format.test(reader);
		if (format) {
			reader.next();
		}
		const id = Identifier.test(reader);
		reader.prev();
		reader.prev();
		if (format) {
			reader.prev();
		}
		return lb && kind && id;
	}

	kind: string;
	id: Identifier;
	context: ?Identifier;
	params: Array<Param>;
	format: {
		startTagAfterStart: ?Format;
		startTagBeforeParam: Array<?Format>;
		startTagBeforeEnd: ?Format;
		endTagAfterStart: ?Format;
		endTagBeforeEnd: ?Format;
	};
	body: Array<Block | NamedBlock>;
	block: Block;

	constructor (): void {
		super();

		this.type = Node.Section;
		this.params = [];
		this.body = [];
		this.format = {
			startTagAfterStart: null,
			startTagBeforeParam: [],
			startTagBeforeEnd: null,
			endTagAfterStart: null,
			endTagBeforeEnd: null
		};
	}

	parse (reader: Reader): this {
		super.parse(reader);

		const startToken = reader.expect("{");

		this.kind = reader.expectSection().value;

		this.format.startTagAfterStart = this.parseFormat(reader);

		this.id = new Identifier().parse(reader);

		if (reader.match(":")) {
			reader.expect(":");
			this.context = new Identifier().parse(reader);
		}

		this.parseParams(reader);

		this.block = new Block().parse(reader);
		this.body.push(this.block);

		this.format.startTagBeforeEnd = this.parseFormat(reader);

		if (reader.match("/")) {
			reader.next();

			const endToken = reader.expect("}");
			this.body.pop();
			delete this.block;
			this.finalize(startToken, endToken);

			return this;
		} else {
			reader.expect("}");
		}

		while (!reader.peek().done) {
			if (!this.parseInner(reader)) {
				break;
			}
		}

		this.format.endTagBeforeEnd = this.parseFormat(reader);

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}

	parseFormat (reader: Reader): ?Format {
		if (Format.test(reader)) {
			const prevToken = reader.token;
			const format = reader.peek().value;
			const node = new Format().parse(reader);
			if (prevToken && reader.peek().value.loc.start.line !== prevToken.loc.start.line) {
				reader.throwUnexpectedToken(format);
			}
			return node;
		} else {
			return null;
		}
	}

	parseParams (reader: Reader): void {
		const format = Format.test(reader);

		if (format) {
			this.format.startTagBeforeParam.push(this.parseFormat(reader));
		}

		if (Param.test(reader)) {
			if (!format && this.params.length !== 0) {
				reader.throwUnexpectedToken(reader.peek().value);
			}

			this.params.push(new Param().parse(reader));
			this.parseParams(reader);
		} else if (format) {
			this.format.startTagBeforeParam.pop();
			reader.prev();
		}
	}

	parseInner (reader: Reader): boolean {
		if (reader.match("{")) {
			reader.next();

			if (reader.match("/")) {
				reader.next();

				this.format.endTagAfterStart = this.parseFormat(reader);

				if (Identifier.test(reader)) {
					const result = this.matchClosingKeys(reader, ".", 0, false);

					if (result.valid) {
						if (this.block) {
							delete this.block.startToken;
							delete this.block;
						}
						return false;
					} else {
						reader.throwUnexpectedToken(result.diff);
					}
				} else {
					reader.throwUnexpectedToken(reader.peek().value);
				}
			} else if (reader.match(":")) {
				reader.prev();
				this.block = new NamedBlock().parse(reader);
				this.body.push(this.block);
				return true;
			} else {
				reader.prev();
			}
		}

		const body = this.block.body;
		const node = Template.parseBodyNode(reader);

		if (node) {
			body.push(node);
		}

		if (this.block instanceof NamedBlock) {
			this.block.finalize(this.block.startToken, body[body.length - 1].endToken);
		} else {
			this.block.finalize(body[0].startToken, body[body.length - 1].endToken);
		}

		return true;
	}

	matchClosingKeys (reader: Reader, delimiter: string, index: number, required: boolean): {valid: boolean, diff: ?Token} {
		if (required || reader.match(delimiter)) {
			reader.expect(delimiter);
		}

		const token = reader.next().value;

		if (token.type !== Token.Key) {
			reader.throwUnexpectedToken(token);
		} else {
			const key = this.id.path[index];
			if (key instanceof Key && key.name !== token.value) {
				return {valid: false, diff: token};
			}
		}

		if (reader.match(delimiter)) {
			index++;

			if (this.id.path.length - 1 < index) {
				reader.throwUnexpectedToken(reader.peek().value);
			}

			return this.matchClosingKeys(reader, delimiter, index, true);
		}

		return {valid: true, diff: null};
	}
}

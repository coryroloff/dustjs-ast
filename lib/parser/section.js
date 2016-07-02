import Node from "./node";
import Identifier from "./identifier";
import Param from "./param";
import Block from "./block";
import NamedBlock from "./named-block";
import Token from "../lexer/token";
import parseNode from "./parse-node";
import Format from "./format";

export default class Section extends Block {
	static get /* istanbul ignore next */ Standard () { return "#"; }
	static get /* istanbul ignore next */ Exists () { return "?"; }
	static get /* istanbul ignore next */ NotExists () { return "^"; }
	static get /* istanbul ignore next */ InlinePartial () { return "<"; }
	static get /* istanbul ignore next */ Block () { return "+"; }
	static get /* istanbul ignore next */ Helper () { return "@"; }
	static get /* istanbul ignore next */ Pragma () { return "%"; }

	static test (reader) {
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

	constructor () {
		super();

		this.type = Node.Section;
		this.params = [];
		this.format = {
			startTagAfterStart: null,
			startTagBeforeParam: [],
			startTagBeforeEnd: null,
			endTagAfterStart: null,
			endTagBeforeEnd: null
		};
	}

	parse (reader) {
		const startToken = reader.expect("{");

		this.kind = reader.expectSection().value;

		this.format.startTagAfterStart = this.parseFormat(reader);

		this.id = parseNode(reader, [Identifier]);

		if (reader.match(":")) {
			reader.expect(":");
			this.context = parseNode(reader, [Identifier]);
		}

		this.parseParams(reader);

		this.block = parseNode(reader, [Block]);
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

	parseFormat (reader) {
		if (Format.test(reader)) {
			const prevToken = reader.token;
			const format = reader.peek().value;
			const node = parseNode(reader, [Format]);
			if (reader.peek().value.loc.start.line !== prevToken.loc.start.line) {
				reader.throwUnexpectedToken(format);
			}
			return node;
		} else {
			return null;
		}
	}

	parseParams (reader) {
		const format = Format.test(reader);

		if (format) {
			this.format.startTagBeforeParam.push(this.parseFormat(reader));
		}

		if (Param.test(reader)) {
			if (!format && this.params.length !== 0) {
				reader.throwUnexpectedToken(reader.peek().value);
			}

			this.params.push(parseNode(reader, [Param]));
			this.parseParams(reader);
		} else if (format) {
			this.format.startTagBeforeParam.pop();
			reader.prev();
		}
	}

	parseInner (reader) {
		if (reader.match("{")) {
			reader.next();

			if (reader.match("/")) {
				reader.next();

				this.format.endTagAfterStart = this.parseFormat(reader);

				if (Identifier.test(reader)) {
					const result = this.matchClosingKeys(reader, ".", 0, false);

					if (result.valid) {
						delete this.block.startToken;
						delete this.block;
						return false;
					} else {
						reader.throwUnexpectedToken(result.diff);
					}
				} else {
					reader.throwUnexpectedToken(reader.peek().value);
				}
			} else if (reader.match(":")) {
				reader.prev();
				this.block = parseNode(reader, [NamedBlock]);
				this.body.push(this.block);
				return true;
			} else {
				reader.prev();
			}
		}

		const body = this.block.body;

		body.push(parseNode(reader));

		if (this.block instanceof NamedBlock) {
			this.block.finalize(this.block.startToken, body[body.length - 1]);
		} else {
			this.block.finalize(body[0], body[body.length - 1]);
		}

		return true;
	}

	matchClosingKeys (reader, delimiter, index, required) {
		if (required || reader.match(delimiter)) {
			reader.expect(delimiter);
		}

		const token = reader.next().value;

		if (token.type !== Token.Key) {
			this.throwUnexpectedToken(token);
		} else if (this.id.path[index].name !== token.value) {
			return {valid: false, diff: token};
		}

		if (reader.match(delimiter)) {
			index++;

			if (this.id.path.length - 1 < index) {
				reader.throwUnexpectedToken(reader.peek().value);
			}

			return this.matchClosingKeys(reader, delimiter, index, true);
		}

		return {valid: true};
	}
}

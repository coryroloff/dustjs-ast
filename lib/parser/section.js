import Node from "./node";
import Identifier from "./identifier";
import Param from "./param";
import Block from "./block";
import NamedBlock from "./named-block";
import Token from "../lexer/token";
import parseNode from "./parse-node";

export default class Section extends Block {
	static get Standard () { return "#"; }
	static get Exists () { return "?"; }
	static get NotExists () { return "^"; }
	static get InlinePartial () { return "<"; }
	static get Block () { return "+"; }
	static get Helper () { return "@"; }

	static test (reader) {
		const lb = reader.match("{");
		reader.next();
		const kind = reader.matchSection();
		reader.prev();
		return lb && kind;
	}

	constructor () {
		super();

		this.type = Node.Section;
		this.params = [];
	}

	parse (reader) {
		const startToken = reader.expect("{");

		this.kind = reader.expectSection().value;
		this.id = parseNode(reader, [Identifier]);

		if (reader.match(":")) {
			reader.expect(":");
			this.context = parseNode(reader, [Identifier]);
		}

		this.parseParams(reader);

		this.block = parseNode(reader, [Block]);
		this.body.push(this.block);

		if (reader.match("/")) {
			reader.next();

			const endToken = reader.expect("}");
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

		const endToken = reader.expect("}");
		this.finalize(startToken, endToken);

		return this;
	}

	parseParams (reader) {
		if (Param.test(reader)) {
			this.params.push(parseNode(reader, [Param]));
			this.parseParams(reader);
		}
	}

	parseInner (reader) {
		if (reader.match("{")) {
			reader.next();

			if (reader.match("/")) {
				reader.next();

				if (Identifier.test(reader)) {
					const result = this.matchClosingKeys(reader, ".", 0, false);

					if (result.valid) {
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

		this.block.body.push(parseNode(reader));

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

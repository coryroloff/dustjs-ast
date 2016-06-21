import Node from "./node";
import Identifer from "./identifier";
import Param from "./param";
import Block from "./block";
import NamedBlock from "./named-block";
import Token from "../lexer/token";
import parse from "./parse";

export default class Section extends Block {
	static get Standard () { return "#"; }
	static get Exists () { return "?"; }
	static get NotExists () { return "^"; }
	static get InlinePartial () { return "<"; }
	static get Block () { return "+"; }
	static get Helper () { return "@"; }

	constructor () {
		super();

		this.type = Node.Section;
		this.params = [];
	}

	parse (reader) {
		const startToken = reader.expect("{");

		this.kind = reader.expectSection().value;
		this.id = new Identifer().parse(reader);

		if (reader.match(":")) {
			reader.expect(":");
			this.context = new Identifer().parse(reader);
		}

		this.parseParams(reader);

		this.block = new Block().parse(reader);
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
		if (reader.peek().value.type === Token.Key) {
			this.params.push(new Param().parse(reader));
			this.parseParams(reader);
		}
	}

	parseInner (reader) {
		if (reader.match("{")) {
			reader.next();

			if (reader.match("/")) {
				reader.next();

				if (reader.peek().value.type === Token.Key) {
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
				this.block = new NamedBlock().parse(reader);
				this.body.push(this.block);
				return true;
			} else {
				reader.prev();
			}
		}

		this.block.body.push(parse(reader));

		return true;
	}

	matchClosingKeys (reader, delimiter, index, required) {
		if (required) {
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

import Node from "./node";
import Identifer from "./identifier";
import Param from "./param";
import Block from "./block";
import NamedBlock from "./named-block";
import Token from "../lexer/token";
import parse from "./parse";

export default class Section extends Block {
	constructor () {
		super();

		this.type = Node.Section;
		this.params = [];
		this.block = new Block();
		this.body.push(this.block);
	}

	parse (reader) {
		this.kind = reader.expectSection().value;

		this.id = new Identifer().parse(reader);

		this.parseParams(reader);

		if (reader.match("/")) {
			reader.next();
			return this;
		} else {
			reader.expect("}");
		}

		while (!reader.peek().done) {
			if (!this.parseInner(reader)) {
				break;
			}
		}

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

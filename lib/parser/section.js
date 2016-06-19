"use strict";

import Node from "./node";
import Reference from "./reference";
import Token from "../lexer/token";
import parse from "./parse";

export default class Section extends Node {
	constructor () {
		super();

		this.body = [];
	}

	parse (reader) {
		const kind = reader.expectSection();

		this.reference = new Reference().parse(reader);

		switch (kind.value) {
		case "#": this.kind = "standard"; break;
		case "?": this.kind = "exists"; break;
		case "^": this.kind = "not-exists"; break;
		}

		reader.expect("}");

		while (!reader.peek().done) {
			if (!this.parseInner(reader)) {
				break;
			}
		}

		return this;
	}

	parseInner (reader) {
		if (reader.match("{")) {
			reader.next();

			if (reader.match("/")) {
				reader.next();

				if (reader.peek().value.type === Token.Key) {
					const result = this.matchClosingKeys(reader, ".", 0, false);

					if (result.valid) {
						return false;
					} else {
						reader.throwUnexpectedToken(result.diff);
					}
				} else {
					reader.throwUnexpectedToken(reader.peek().value);
				}
			} else {
				reader.prev();
			}
		}

		this.body.push(parse(reader));

		return true;
	}

	matchClosingKeys (reader, delimiter, index, required) {
		if (required) {
			reader.expect(delimiter);
		}

		const token = reader.next().value;

		if (token.type !== Token.Key) {
			this.throwUnexpectedToken(token);
		} else if (this.reference.path[index].name !== token.value) {
			return {valid: false, diff: token};
		}

		if (reader.match(delimiter)) {
			index++;

			if (this.reference.path.length - 1 < index) {
				reader.throwUnexpectedToken(reader.peek().value);
			}

			return this.matchClosingKeys(reader, delimiter, index, true);
		}

		return {valid: true};
	}
}

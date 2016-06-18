"use strict";

import Node from "./node";
import Reference from "./reference";
import Token from "../lexer/token";
import parse from "./parse";

export default class Section extends Node {
	static parse (reader) {
		const type = reader.expectSection();
		const section = new Section();
		section.reference = Reference.parse(reader);

		switch (type.value) {
		case "#": this.type = "standard"; break;
		case "?": this.type = "exists"; break;
		case "^": this.type = "not-exists"; break;
		default: this.type = "";
		}

		reader.expect("}");

		while (!reader.peek().done) {
			if (!Section.parseInner(reader, section)) {
				break;
			}
		}

		return section;
	}

	static parseInner (reader, section) {
		if (reader.match("{")) {
			reader.next();

			if (reader.match("/")) {
				reader.next();

				if (reader.peek().value.type === Token.Key) {
					const ref = new Reference();
					Reference.parseDelimitedKeys(reader, ".", ref.path, false);

					if (ref.test(section.reference)) {
						return false;
					} else {
						for (let i = 0; i < ref.path.length; i++) {
							reader.prev();
							reader.prev();
						}
					}
				} else {
					reader.throwUnexpectedToken(reader.peek().value);
				}
			} else {
				reader.prev();
			}
		}

		section.body.push(parse(reader));

		return true;
	}

	constructor () {
		super();

		this.body = [];
	}
}

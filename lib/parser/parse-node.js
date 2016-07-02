import Comment from "./comment";
import Buffer from "./buffer";
import Raw from "./raw";
import Reference from "./reference";
import Section from "./section";
import Special from "./special";
import Partial from "./partial";
import Format from "./format";

export const nodes = [];

export default function parseNode (reader, types = [Comment, Buffer, Raw, Format, Reference, Section, Special, Partial]) {
	for (const klass of types) {
		if (klass.test(reader)) {
			const node = new (klass)().parse(reader);
			nodes.push(node);
			return node;
		}
	}

	if (reader.match("{")) {
		reader.next();
	}

	reader.throwUnexpectedToken(reader.peek().value);
}

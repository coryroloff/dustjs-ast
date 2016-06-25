import Comment from "./comment";
import Buffer from "./buffer";
import Raw from "./raw";
import Reference from "./reference";
import Section from "./section";
import Special from "./special";
import Partial from "./partial";
import Format from "./format";

export default function parseNode (reader, nodes = [Comment, Buffer, Raw, Format, Reference, Section, Special, Partial]) {
	for (const klass of nodes) {
		if (klass.test(reader)) {
			return new (klass)().parse(reader);
		}
	}

	if (reader.match("{")) {
		reader.next();
	}

	reader.throwUnexpectedToken(reader.peek().value);
}

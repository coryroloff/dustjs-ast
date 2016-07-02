// @flow

import Identifier from "./identifier";
import Key from "./key";
import Node from "./node";
import Reader from "./reader";
import parseNode from "./parse-node";

export default class Reference extends Node {
	static test (reader: Reader): boolean {
		const lb = reader.match("{");
		reader.next();
		const id = Identifier.test(reader);
		reader.prev();
		return lb && id;
	}

	id: Identifier;
	filters: Array<Key>;

	constructor (): void {
		super();

		this.type = Node.Reference;
		this.filters = [];
	}

	parse (reader: Reader): this {
		const startToken = reader.expect("{");

		this.id = parseNode(reader, [Identifier]);

		if (reader.match("|")) {
			this.parseFilters(reader);
		}

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}

	parseFilters (reader: Reader): void {
		const delimiter = "|";

		reader.expect(delimiter);
		this.filters.push(parseNode(reader, [Key]));

		if (reader.match(delimiter)) {
			this.parseFilters(reader);
		}
	}
}

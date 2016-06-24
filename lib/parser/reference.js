import Node from "./node";
import Key from "./key";
import Identifier from "./identifier";
import parseNode from "./parse-node";

export default class Reference extends Node {
	static test (reader) {
		const lb = reader.match("{");
		reader.next();
		const id = Identifier.test(reader);
		reader.prev();
		return lb && id;
	}

	constructor () {
		super();

		this.type = Node.Reference;
		this.id = null;
		this.filters = [];
	}

	parse (reader) {
		const startToken = reader.expect("{");

		this.id = parseNode(reader, [Identifier]);

		if (reader.match("|")) {
			this.parseFilters(reader);
		}

		if (reader.match("/")) {
			reader.next();
		}

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}

	parseFilters (reader) {
		const delimiter = "|";

		reader.expect(delimiter);
		this.filters.push(parseNode(reader, [Key]));

		if (reader.match(delimiter)) {
			this.parseFilters(reader);
		}
	}
}

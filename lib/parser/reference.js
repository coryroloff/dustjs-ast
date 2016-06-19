import Node from "./node";
import Key from "./key";
import Identifier from "./identifier";

export default class Reference extends Node {
	constructor () {
		super();

		this.id = null;
		this.filters = [];
	}

	parse (reader) {
		this.id = new Identifier().parse(reader);

		if (reader.match("|")) {
			this.parseFilters(reader);
		}

		if (reader.match("/")) {
			reader.next();
		}

		return this;
	}

	parseFilters (reader) {
		const delimiter = "|";

		reader.expect(delimiter);
		this.filters.push(new Key().parse(reader));

		if (reader.match(delimiter)) {
			this.parseFilters(reader);
		}
	}
}

import Node from "./node";
import Key from "./key";

export default class Reference extends Node {
	constructor () {
		super();

		this.path = [];
		this.filters = [];
	}

	parse (reader) {
		const keys = [];
		this.parseDelimitedKeys(reader, ".", keys, false);
		this.path = this.path.concat(keys);

		if (reader.match("|")) {
			reader.expect("|");

			const keys = [];
			this.parseDelimitedKeys(reader, "|", keys, false);
			this.filters = this.filters.concat(keys);
		}

		this.finalize(this.path[0], this.path[this.path.length - 1]);

		if (reader.match("/")) {
			reader.next();
		}

		return this;
	}

	parseDelimitedKeys (reader, delimiter, keys, required) {
		if (required) {
			reader.expect(delimiter);
		}

		keys.push(new Key().parse(reader));

		if (reader.match(delimiter)) {
			this.parseDelimitedKeys(reader, delimiter, keys, true);
		}
	}
}

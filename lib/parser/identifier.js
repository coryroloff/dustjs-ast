import Node from "./node";
import Key from "./key";

export default class Identifier extends Node {
	constructor () {
		super();

		this.type = Node.Identifier;
		this.path = [];
	}

	parse (reader) {
		this.parseKeys(reader, false);
		this.finalize(this.path[0], this.path[this.path.length - 1]);

		return this;
	}

	parseKeys (reader, required) {
		const delimiter = ".";

		if (required) {
			reader.expect(delimiter);
		}

		this.path.push(new Key().parse(reader));

		if (reader.match(delimiter)) {
			this.parseKeys(reader, true);
		}
	}
}

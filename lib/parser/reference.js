import Node from "./node";
import Key from "./key";

export default class Reference extends Node {
	static parse (reader) {
		const ref = new Reference();

		const keys = [];
		Reference.parseDelimitedKeys(reader, ".", keys, false);
		ref.path = ref.path.concat(keys);

		if (reader.match("|")) {
			reader.expect("|");

			const keys = [];
			Reference.parseDelimitedKeys(reader, "|", keys, false);
			ref.filters = ref.filters.concat(keys);
		}

		ref.finalize(ref.path[0], ref.path[ref.path.length - 1]);

		if (reader.match("/")) {
			reader.next();
		}

		return ref;
	}

	static parseDelimitedKeys (reader, delimiter, keys, required) {
		if (required) {
			reader.expect(delimiter);
		}

		keys.push(Key.parse(reader));

		if (reader.match(delimiter)) {
			Reference.parseDelimitedKeys(reader, delimiter, keys, true);
		}
	}

	constructor () {
		super();

		this.path = [];
		this.filters = [];
	}

	test (reference) {
		let matches = true;

		for (let i = 0; i < reference.path.length; i++) {
			if (reference.path[i].name !== this.path[i].name) {
				matches = false;
				break;
			}
		}

		return matches;
	}
}

import Node from "./node";
import Key from "./key";

export default class Reference extends Node {
	static parse (reader) {
		const ref = new Reference();
		const parsePath = (dot = false) => {
			if (dot) {
				reader.expect(".");
			}

			ref.path.push(Key.parse(reader));

			if (reader.match(".")) {
				parsePath(true);
			}
		};

		parsePath();

		ref.finalize(ref.path[0], ref.path[ref.path.length - 1]);

		return ref;
	}

	constructor () {
		super();

		this.path = [];
	}
}

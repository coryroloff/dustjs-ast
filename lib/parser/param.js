import Node from "./node";
import Token from "../lexer/token";
import Key from "./key";
import Identifier from "./identifier";

export default class Param extends Node {
	constructor () {
		super();

		this.type = Node.Param;
		this.key = null;
		this.value = [];
	}

	parse (reader) {
		this.key = new Key().parse(reader);

		reader.expect("=");

		this.parseValue(reader);
		this.finalize(this.key, this.value[this.value.length - 1]);

		return this;
	}

	parseValue (reader) {
		const token = reader.peek().value;

		if (token.type === Token.Key) {
			this.value.push(new Identifier().parse(reader));
		} else {
			reader.throwUnexpectedToken(token);
		}
	}
}

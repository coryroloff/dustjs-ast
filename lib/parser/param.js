import Node from "./node";
import Token from "../lexer/token";
import Key from "./key";
import Identifier from "./identifier";
import Inline from "./inline";
import Literal from "./literal";

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
		this.finalize(this.key, this.value);

		return this;
	}

	parseValue (reader) {
		const token = reader.peek().value;

		if (reader.matchType(Token.Key)) {
			this.value = new Identifier().parse(reader);
		} else if (reader.matchType(Token.Literal)) {
			if (token.value === "\"" || (token.value.startsWith("\"") && !token.value.endsWith("\""))) {
				this.value = new Inline().parse(reader);
			} else {
				this.value = new Literal().parse(reader);
			}
		} else {
			reader.throwUnexpectedToken(token);
		}
	}
}

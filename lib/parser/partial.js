import Node from "./node";
import Token from "../lexer/token";
import Key from "./key";
import Inline from "./inline";
import Literal from "./literal";
import Identifier from "./identifier";
import Param from "./param";

export default class Partial extends Node {
	constructor () {
		super();

		this.type = Node.Partial;
		this.value = null;
		this.context = null;
		this.params = [];
	}

	parse (reader) {
		const startToken = reader.expect("{");

		reader.expect(">");

		const token = reader.peek().value;

		if (reader.matchType(Token.Key)) {
			this.value = new Key().parse(reader);
		} else if (reader.matchType(Token.Literal)) {

			if (token.value === "\"" || (token.value.startsWith("\"") && !token.value.endsWith("\""))) {
				this.value = new Inline().parse(reader);
			} else {
				this.value = new Literal().parse(reader);
			}
		} else {
			reader.throwUnexpectedToken(token);
		}

		if (reader.match(":")) {
			reader.expect(":");
			this.context = new Identifier().parse(reader);
		}

		this.parseParams(reader);

		reader.expect("/");

		const endToken = reader.expect("}");

		this.finalize(startToken, endToken);

		return this;
	}

	parseParams (reader) {
		if (reader.peek().value.type === Token.Key) {
			this.params.push(new Param().parse(reader));
			this.parseParams(reader);
		}
	}
}

// @flow

import Node from "./parser/node";
import t from "./types";

export default class Printer {
	data: string;
	options: Object;

	constructor (options: Object = {}): void {
		this.data = "";
		this.options = Object.assign({
			format: true,
			comments: true
		}, options);
	}

	write (data: string): void {
		this.data += data;
	}

	print (ast: Object): string {
		this.printNode(ast);
		return this.data;
	}

	printNode (node: Object): void {
		if (t.isBuffer(node)) this.printBuffer(node);
		else if (t.isComment(node)) this.printComment(node);
		else if (t.isFormat(node)) this.printFormat(node);
		else if (t.isIdentifier(node)) this.printIdentifier(node);
		else if (t.isInline(node)) this.printInline(node);
		else if (t.isKey(node)) this.printKey(node);
		else if (t.isTemplate(node)) this.printTemplate(node);
		else if (t.isNamedBlock(node)) this.printNamedBlock(node);
		else if (t.isBlock(node)) this.printBlock(node);
		else if (t.isNumericLiteral(node)) this.printNumericLiteral(node);
		else if (t.isParam(node)) this.printParam(node);
		else if (t.isPartial(node)) this.printPartial(node);
		else if (t.isRaw(node)) this.printRaw(node);
		else if (t.isReference(node)) this.printReference(node);
		else if (t.isSection(node)) this.printSection(node);
		else if (t.isSpecial(node)) this.printSpecial(node);
		else if (t.isStringLiteral(node)) this.printStringLiteral(node);
		else throw new Error("Unknown type: " + node.type);
	}

	printJoin (node: Object, nodes: Array<Object>, delimiter: string, format: ?Object): void {
		nodes.forEach((n: Object, i: number): void => {
			if (format) {
				this.write(format[i].value);
			} else if (i > 0) {
				this.write(delimiter);
			}
			this.printNode(n);
		});
	}

	printTemplate (node: Object): void {
		node.body.forEach((n: Object): Object | void => this.printNode(n));
	}

	printBuffer (node: Object): void {
		this.write(node.value);
	}

	printReference (node: Object): void {
		this.write("{");
		this.printNode(node.id);
		node.filters.forEach((fNode: Object): void => {
			this.write("|");
			this.printNode(fNode);
		});
		this.write("}");
	}

	printIdentifier (node: Object): void {
		if (node.localContext) {
			this.write(".");
		}
		node.path.forEach((n: Object, i: number): void => {
			if (i > 0 && n.type !== Node.NumericLiteral) {
				this.write(".");
			}
			if (n.type === Node.NumericLiteral) {
				this.write("[");
			}
			this.printNode(n);
			if (n.type === Node.NumericLiteral) {
				this.write("]");
			}
		});
	}

	printKey (node: Object): void {
		this.write(node.name);
	}

	printSection (node: Object): void {
		this.write("{");
		this.write(node.kind);
		if (node.format.startTagAfterStart) {
			this.printNode(node.format.startTagAfterStart);
		}
		this.printNode(node.id);
		if (node.context) {
			this.write(":");
			this.printNode(node.context);
		}
		if (node.params.length) {
			this.printJoin(node, node.params, " ", node.format.startTagBeforeParam);
		}
		if (node.body.length) {
			if (node.format.startTagBeforeEnd) {
				this.printNode(node.format.startTagBeforeEnd);
			}
			this.write("}");
			node.body.forEach((n: Object): Object | void =>this.printNode(n));
			this.write("{/");
			if (node.format.endTagAfterStart) {
				this.printNode(node.format.endTagAfterStart);
			}
			this.printNode(node.id);
			if (node.format.endTagBeforeEnd) {
				this.printNode(node.format.endTagBeforeEnd);
			}
			this.write("}");
		} else {
			if (node.format.startTagBeforeEnd) {
				this.printNode(node.format.startTagBeforeEnd);
			}
			this.write("/}");
		}
	}

	printParam (node: Object): void {
		this.printNode(node.key);
		this.write("=");
		this.printNode(node.value);
	}

	printStringLiteral (node: Object): void {
		this.write(node.value);
	}

	printNumericLiteral (node: Object): void {
		this.write(node.value);
	}

	printBlock (node: Object): void {
		node.body.forEach((n: Object): Object | void =>this.printNode(n));
	}

	printNamedBlock (node: Object): void {
		this.write("{:");
		this.printNode(node.key);
		this.write("}");
		node.body.forEach((n: Object): Object | void => this.printNode(n));
	}

	printInline (node: Object): void {
		this.write("\"");
		node.body.forEach((n: Object): Object | void => this.printNode(n));
		this.write("\"");
	}

	printPartial (node: Object): void {
		this.write("{");
		this.write(node.kind);
		if (node.format.afterStart) {
			this.printNode(node.format.afterStart);
		}
		this.printNode(node.value);
		if (node.context) {
			this.write(":");
			this.printNode(node.context);
		}
		if (node.params.length) {
			this.printJoin(node, node.params, " ", node.format.beforeParam);
		}
		if (node.format.beforeEnd) {
			this.printNode(node.format.beforeEnd);
		}
		this.write("/}");
	}

	printComment (node: Object): void {
		if (this.options.comments) {
			this.write("{!");
			this.write(node.value);
			this.write("!}");
		}
	}

	printRaw (node: Object): void {
		this.write("{`");
		this.write(node.value);
		this.write("`}");
	}

	printFormat (node: Object): void {
		if (this.options.format) {
			this.write(node.value);
		}
	}

	printSpecial (node: Object): void {
		this.write("{~");
		this.printNode(node.key);
		this.write("}");
	}
}

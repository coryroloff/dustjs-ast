// @flow

import Node from "./parser/node";

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

	printNode (node: Object): Object | void {
		switch (node.type) {
		case Node.Template: return this.printTemplate(node);
		case Node.Buffer: return this.printBuffer(node);
		case Node.Reference: return this.printReference(node);
		case Node.Identifier: return this.printIdentifier(node);
		case Node.Key: return this.printKey(node);
		case Node.Section: return this.printSection(node);
		case Node.Param: return this.printParam(node);
		case Node.StringLiteral: return this.printStringLiteral(node);
		case Node.NumericLiteral: return this.printNumericLiteral(node);
		case Node.Block: return this.printBlock(node);
		case Node.NamedBlock: return this.printNamedBlock(node);
		case Node.Inline: return this.printInline(node);
		case Node.Partial: return this.printPartial(node);
		case Node.Comment: return this.printComment(node);
		case Node.Raw: return this.printRaw(node);
		case Node.Format: return this.printFormat(node);
		case Node.Special: return this.printSpecial(node);
		default:
			throw new Error("Unknown type: " + node.type);
		}
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

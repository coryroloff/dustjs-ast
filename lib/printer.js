import Node from "./parser/node";

export default class Printer {
	constructor () {
		this.data = "";
	}

	write (data) {
		this.data += data;
	}

	print (ast) {
		this.printNode(ast);
		return this.data;
	}

	printNode (node) {
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
		default:
			throw new Error("Unknown type: " + node.type);
		}
	}

	printJoin (nodes, delimiter) {
		nodes.forEach((node, i) => {
			if (i > 0) {
				this.write(delimiter);
			}
			this.printNode(node);
		});
	}

	printTemplate (node) {
		node.body.forEach(n => this.printNode(n));
	}

	printBuffer (node) {
		this.write(node.text);
	}

	printReference (node) {
		this.write("{");
		this.printNode(node.id);
		node.filters.forEach(fNode => {
			this.write("|");
			this.printNode(fNode);
		});
		this.write("}");
	}

	printIdentifier (node) {
		if (node.localContext) {
			this.write(".");
		}
		node.path.forEach((n, i) => {
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

	printKey (node) {
		this.write(node.name);
	}

	printSection (node) {
		this.write("{");
		this.write(node.kind);
		this.printNode(node.id);
		if (node.params.length) {
			this.write(" ");
			this.printJoin(node.params, " ");
		}
		if (node.body[0].body.length) {
			this.write("}");
			node.body.forEach(n=>this.printNode(n));
			this.write("{/");
			this.printNode(node.id);
			this.write("}");
		} else {
			this.write("/}");
		}
	}

	printParam (node) {
		this.printNode(node.key);
		this.write("=");
		this.printNode(node.value);
	}

	printStringLiteral (node) {
		this.write(node.value);
	}

	printNumericLiteral (node) {
		this.write(node.value);
	}

	printBlock (node) {
		node.body.forEach(n=>this.printNode(n));
	}

	printNamedBlock (node) {
		this.write("{:");
		this.printNode(node.key);
		this.write("}");
		node.body.forEach(n => this.printNode(n));
	}

	printInline (node) {
		this.write("\"");
		node.body.forEach(n => this.printNode(n));
		this.write("\"");
	}

	printPartial (node) {
		this.write("{>");
		this.printNode(node.value);
		if (node.context) {
			this.write(":");
			this.printNode(node.context);
		}
		if (node.params.length) {
			this.write(" ");
			this.printJoin(node.params, " ");
		}
		this.write("/}");
	}

	printComment (node) {
		this.write("{!");
		this.write(node.text);
		this.write("!}");
	}

	printRaw (node) {
		this.write("{`");
		this.write(node.text);
		this.write("`}");
	}
}

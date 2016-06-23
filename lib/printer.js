import Node from "./parser/node";

export default class Printer {
	constructor () {
		this.data = "";
	}
	write (data) {
		this.data += data;
	}

	printJoin (nodes, delim) {
		nodes.forEach((node, i) => {
			if (i > 0) {
				this.write(delim);
			}
			this.printNode(node);
		});
	}

	printNode (node) {
		switch (node.type) {
		case Node.Template:
			node.body.forEach(n => this.printNode(n));
			break;
		case Node.Buffer:
			this.write(node.text);
			break;
		case Node.Reference:
			this.write("{");
			this.printNode(node.id);
			node.filters.forEach(fNode => {
				this.write("|");
				this.printNode(fNode);
			});
			this.write("}");
			break;
		case Node.Identifier:
			node.path.forEach((n, i) => {
				if (i > 0 && n.type !== "NumericLiteral") {
					this.write(".");
				}
				if (n.type === "NumericLiteral") {
					this.write("[");
				}
				this.printNode(n);
				if (n.type === "NumericLiteral") {
					this.write("]");
				}
			});
			break;
		case Node.Key:
			if (/^[0-9]+$/.test(node.name)) {
				this.write("[" + node.name + "]");
			} else {
				this.write(node.name);
			}
			break;
		case Node.Section:
			this.write("{");
			this.write(node.kind);
			this.printNode(node.id);
			if (node.params.length) {
				this.write(" ");
				this.printJoin(node.params, " ");
			}
			if (node.body.length) {
				this.write("}");
				node.body.forEach(n=>this.printNode(n));
				this.write("{/");
				this.printNode(node.id);
				this.write("}");
			} else {
				this.write("/}");
			}
			break;
		case Node.Param:
			this.printNode(node.key);
			this.write("=");
			this.printNode(node.value);
			break;
		case Node.Literal:
			this.write(node.value);
			break;
		case Node.Block:
			node.body.forEach(n=>this.printNode(n));
			break;
		case Node.NamedBlock:
			this.write("{:");
			this.printNode(node.key);
			this.write("}");
			node.body.forEach(n => this.printNode(n));
			break;

		default:
			throw new Error("Unknown type: " + node.type);
		}
	}
}

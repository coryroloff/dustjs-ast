// @flow

import t from "./types";

export default class Traverser {
	visitor: Object;
	stack: Array<Object>;
	stop: boolean;
	ast: Object;

	constructor (node: Object, visitor: Object): void {
		this.visitor = visitor;
		this.stack = [];
		this.stop = false;
		this.ast = JSON.parse(JSON.stringify(node));
		this.visit(this.ast);
	}

	visit (node: Object): void {
		const path = this.enter(node);

		if (path.shouldSkip) {
			return;
		}

		if (t.isTemplate(node)) {
			for (const n of node.body) {
				if (this.stop) break;
				this.visit(n);
			}
		} else if (t.isReference(node)) {
			if (!this.stop) this.visit(node.id);
			for (const n of node.filters) {
				if (this.stop) break;
				this.visit(n);
			}
		} else if (t.isIdentifier(node)) {
			for (const n of node.path) {
				if (this.stop) break;
				this.visit(n);
			}
		} else if (t.isInline(node)) {
			for (const n of node.body) {
				if (this.stop) break;
				this.visit(n);
			}
		} else if (t.isNamedBlock(node)) {
			if (!this.stop) this.visit(node.key);
			for (const n of node.body) {
				if (this.stop) break;
				this.visit(n);
			}
		} else if (t.isBlock(node)) {
			for (const n of node.body) {
				if (this.stop) break;
				this.visit(n);
			}
		} else if (t.isParam(node)) {
			if (!this.stop) this.visit(node.key);
			if (!this.stop) this.visit(node.value);
		} else if (t.isPartial(node)) {
			if (!this.stop) this.visit(node.value);
			if (!this.stop && node.context) this.visit(node.context);
			for (const n of node.params) {
				if (this.stop) break;
				this.visit(n);
			}
			if (!this.stop && node.format.afterStart) this.visit(node.format.afterStart);
			for (const n of node.format.beforeParam) {
				if (this.stop) break;
				this.visit(n);
			}
			if (!this.stop && node.format.beforeEnd) this.visit(node.format.beforeEnd);
		} else if (t.isSection(node)) {
			if (!this.stop) this.visit(node.id);
			if (!this.stop && node.context) this.visit(node.context);
			for (const n of node.params) {
				if (this.stop) break;
				this.visit(n);
			}
			for (const n of node.body) {
				if (this.stop) break;
				this.visit(n);
			}
			if (!this.stop && node.format.startTagAfterStart) this.visit(node.format.startTagAfterStart);
			for (const n of node.format.startTagBeforeParam) {
				if (this.stop) break;
				this.visit(n);
			}
			if (!this.stop && node.format.startTagBeforeEnd) this.visit(node.format.startTagBeforeEnd);
			if (!this.stop && node.format.endTagAfterStart) this.visit(node.format.endTagAfterStart);
			if (!this.stop && node.format.endTagBeforeEnd) this.visit(node.format.endTagBeforeEnd);
		} else if (t.isSpecial(node)) {
			if (!this.stop) this.visit(node.key);
		}

		this.exit(node);
	}

	create (node: Object): Object {
		const parentPath = this.stack[this.stack.length - 1];

		const path = {
			node: node,
			parentPath: parentPath ? parentPath : null,
			parent: parentPath ? parentPath.node : null,
			shouldSkip: false,
			skip (): void {
				this.shouldSkip = true;
			},
			shouldStop: false,
			stop (): void {
				this.shouldStop = true;
			},
			set (key: string, value: any): void {
				node[key] = value;
			},
			get (key: string): any {
				return node[key];
			}
		};

		for (const prop in t) {
			const func = t[prop];
			if (typeof func === "function") {
				path[prop] = func.bind(this, node);
			}
		}

		return path;
	}

	enter (node: Object): Object {
		const path = this.create(node);
		const type = this.visitor[node.type];

		this.stack.push(path);

		if (this.visitor.enter) {
			this.visitor.enter(path);
		} else if (type && type.enter) {
			type.enter(path);
		} else if (type) {
			type(path);
		}

		if (path.shouldStop) {
			this.stop = true;
		}

		return path;
	}

	exit (node: Object): void {
		const path = this.stack.pop();
		const type = this.visitor[node.type];

		if (this.visitor.exit) {
			this.visitor.exit(path);
		} else if (type && type.exit) {
			type.exit(path);
		}
	}
}

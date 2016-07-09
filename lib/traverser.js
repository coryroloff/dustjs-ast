// @flow

import t from "./types";

export default class Traverser {
	visitor: Object;
	stack: Array<Object>;
	cache: Object;

	constructor (visitor: Object): void {
		this.visitor = visitor;
		this.stack = [];
		this.cache = {
			noop: new Function(),
			visit: this.visit,
			enter: this.enter,
			exit: this.exit
		};
	}

	visit (node: Object): void {
		const path = this.enter(node);

		if (path.shouldSkip) {
			return;
		}

		if (t.isTemplate(node)) {
			node.body.forEach((n: Object): void => this.visit(n));
		} else if (t.isReference(node)) {
			this.visit(node.id);
			node.filters.forEach((n: Object): void => this.visit(n));
		} else if (t.isIdentifier(node)) {
			node.path.forEach((n: Object): void => this.visit(n));
		} else if (t.isInline(node)) {
			node.body.forEach((n: Object): void => this.visit(n));
		} else if (t.isNamedBlock(node)) {
			this.visit(node.key);
			node.body.forEach((n: Object): void => this.visit(n));
		} else if (t.isBlock(node)) {
			node.body.forEach((n: Object): void => this.visit(n));
		} else if (t.isParam(node)) {
			this.visit(node.key);
			this.visit(node.value);
		} else if (t.isPartial(node)) {
			this.visit(node.value);
			if (node.context) this.visit(node.context);
			node.params.forEach((n: Object): void => this.visit(n));
			if (node.format.afterStart) this.visit(node.format.afterStart);
			node.format.beforeParam.forEach((n: Object): void => this.visit(n));
			if (node.format.beforeEnd) this.visit(node.format.beforeEnd);
		} else if (t.isSection(node)) {
			this.visit(node.id);
			if (node.context) this.visit(node.context);
			node.params.forEach((n: Object): void => this.visit(n));
			node.body.forEach((n: Object): void => this.visit(n));
			if (node.format.startTagAfterStart) this.visit(node.format.startTagAfterStart);
			node.format.startTagBeforeParam.forEach((n: Object): void => this.visit(n));
			if (node.format.startTagBeforeEnd) this.visit(node.format.startTagBeforeEnd);
			if (node.format.endTagAfterStart) this.visit(node.format.endTagAfterStart);
			if (node.format.endTagBeforeEnd) this.visit(node.format.endTagBeforeEnd);
		} else if (t.isSpecial(node)) {
			this.visit(node.key);
		}

		this.exit(node);
	}

	create (node: Object): Object {
		const parentPath = this.stack[this.stack.length - 1];

		const path = {
			node: this.clone(node),
			parentPath: parentPath ? parentPath : null,
			parent: parentPath ? parentPath.node : null,
			shouldSkip: false,
			skip (): void {
				this.shouldSkip = true;
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

	clone (object: Object): Object {
		return JSON.parse(JSON.stringify(object));
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

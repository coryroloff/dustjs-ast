// @flow

import Node from "./parser/node";

export default {
	isBuffer (node: Node): boolean {
		return node.type === Node.Buffer;
	},

	isComment (node: Node): boolean {
		return node.type === Node.Comment;
	},

	isFormat (node: Node): boolean {
		return node.type === Node.Format;
	},

	isIdentifier (node: Node): boolean {
		return node.type === Node.Identifier;
	},

	isInline (node: Node): boolean {
		return node.type === Node.Inline;
	},

	isKey (node: Node): boolean {
		return node.type === Node.Key;
	},

	isTemplate (node: Node): boolean {
		return node.type === Node.Template;
	},

	isNamedBlock (node: Node): boolean {
		return node.type === Node.NamedBlock;
	},

	isBlock (node: Node): boolean {
		return node.type === Node.Block;
	},

	isNumericLiteral (node: Node): boolean {
		return node.type === Node.NumericLiteral;
	},

	isStringLiteral (node: Node): boolean {
		return node.type === Node.StringLiteral;
	},

	isParam (node: Node): boolean {
		return node.type === Node.Param;
	},

	isPartial (node: Node): boolean {
		return node.type === Node.Partial;
	},

	isRaw (node: Node): boolean {
		return node.type === Node.Raw;
	},

	isReference (node: Node): boolean {
		return node.type === Node.Reference;
	},

	isSection (node: Node): boolean {
		return node.type === Node.Section;
	},

	isSpecial (node: Node): boolean {
		return node.type === Node.Special;
	}
};

// @flow

import {default as parseNode, nodes} from "./parse-node";
import Node from "./node";
import Reader from "./reader";
import Template from "./template";

export default function parser (code: string, options: Object): Template {
	const node = parseNode(new Reader(code, options), [Template]);

	nodes.forEach((node: Node): void => {
		delete node.startToken;
		delete node.endToken;
	});

	return node;
}

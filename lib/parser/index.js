// @flow

import Node from "./node";
import Reader from "./reader";
import Template from "./template";

export default function parser (code: string, options: Object): Template {
	const reader = new Reader(code, options);
	const template = new Template().parse(reader);

	reader.nodes.forEach((node: Node): void => {
		delete node.startToken;
		delete node.endToken;
	});

	return JSON.parse(JSON.stringify(template));
}

import Reader from "./reader";
import Template from "./template";
import {default as parseNode, nodes} from "./parse-node";

export default function parser (code, options) {
	const node = parseNode(new Reader(code, options), [Template]);
	nodes.forEach(node => {
		delete node.startToken;
		delete node.endToken;
	});
	return node;
}

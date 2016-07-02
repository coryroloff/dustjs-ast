import Reader from "./reader";
import Template from "./template";
import parseNode from "./parse-node";

export default function parser (code, options) {
	return parseNode(new Reader(code, options), [Template]);
}

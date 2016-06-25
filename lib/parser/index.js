import Reader from "./reader";
import Template from "./template";

export default function parser (code, options) {
	return new Template().parse(new Reader(code, options));
}

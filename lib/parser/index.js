import Reader from "./reader";
import Template from "./template";

export default function parser (code) {
	return new Template().parse(new Reader(code));
}

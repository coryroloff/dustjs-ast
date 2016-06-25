import parser from "./parser";
import Printer from "./printer";

export {default as Token} from "./lexer/token";
export {default as Node} from "./parser/node";
export {default as Section} from "./parser/section";

export default {
	parse: parser,
	print: (ast) => {
		const printer = new Printer();
		return printer.print(ast);
	}
};

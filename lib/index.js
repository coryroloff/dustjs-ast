import parser from "./parser";
import Printer from "./printer";

export {default as Token} from "./lexer/token";
export {default as Node} from "./parser/node";
export {default as Section} from "./parser/section";
export {default as Partial} from "./parser/Partial";

export default {
	parse: parser,
	print: (ast, options) => {
		const printer = new Printer(options);
		return printer.print(ast);
	}
};

// @flow

import parser from "./parser";
import Printer from "./printer";
import Traverser from "./traverser";

export {default as types} from "./types";

export default {
	parse (code: string, options: Object): Object {
		return JSON.parse(JSON.stringify(parser(code, options)));
	},

	print (ast: Object, options: Object): string {
		return new Printer(options).print(ast);
	},

	traverse (ast: Object, visitor: Object): void {
		return new Traverser(ast, visitor).ast;
	}
};

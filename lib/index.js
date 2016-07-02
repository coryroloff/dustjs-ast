// @flow

import parser from "./parser";
import Printer from "./printer";

export default {
	parse (code: string, options: Object): Object {
		return JSON.parse(JSON.stringify(parser(code, options)));
	},

	print (ast: Object, options: Object): string {
		const printer = new Printer(options);
		return printer.print(ast);
	}
};

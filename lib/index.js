import parser from "./parser";

export {default as Token} from "./lexer/token";
export {default as Node} from "./lexer/node";

export default {
	parse: parser
};

import lexer from "./lexer";
import parser from "./parser";

export default {
	lex: lexer,
	parse: parser
};

export {default as Token} from "./lexer/token";
export {default as Node} from "./parser/node";

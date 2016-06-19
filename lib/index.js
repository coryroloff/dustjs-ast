import parser from "./parser";

export {default as Token} from "./lexer/token";
export {default as Node} from "./parser/node";

export default {
	parse: parser
};

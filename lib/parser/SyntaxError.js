// @flow

import Token from "../lexer/token";

export default class SyntaxError extends Error {
	token: ?Token;
}

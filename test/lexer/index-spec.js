"use strict";

import {expect} from "chai";
import tokenize from "../../lib/lexer";
import alphabet from "alphabet";

describe("tokenizer", function () {
	for (const char of alphabet.concat(["_", "$"])) {
		it(`should tokenize when character has prefix: ${char}`, function () {
			expect(tokenize(`{${char}char}`)).to.deep.equal([
				{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}},
                {type: "Key", value: `${char}char`, loc: {start: {line: 1, column: 2}, end: {line: 1, column: 7}}},
				{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 7}, end: {line: 1, column: 8}}}
			]);
		});
	}

	for (const char of ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
		it(`should not tokenize when character has prefix: ${char}`, function () {
			expect(() => tokenize(`{${char}char}`)).to.throw();
		});
	}

	it("should parse paths of keys and punctuators (.)", function () {
		expect(tokenize("{one.two.three}")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}},
			{type: "Key", value: "one", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 5}}},
			{type: "Punctuator", value: ".", loc: {start: {line: 1, column: 5}, end: {line: 1, column: 6}}},
			{type: "Key", value: "two", loc: {start: {line: 1, column: 6}, end: {line: 1, column: 9}}},
			{type: "Punctuator", value: ".", loc: {start: {line: 1, column: 9}, end: {line: 1, column: 10}}},
			{type: "Key", value: "three", loc: {start: {line: 1, column: 10}, end: {line: 1, column: 15}}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 15}, end: {line: 1, column: 16}}}
		]);
	});

	it("should tokenize comments with quotes and other syntax", function () {
		expect(tokenize("{! hello \" {one} {#hey}{/hey} !}")).to.deep.equal([
			{type: "Comment", value: " hello \" {one} {#hey}{/hey} ", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 33}}}
		]);
	});

	it("should tokenize references in literals", function () {
		expect(tokenize("{\"start{tests}end\"}")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}},
			{type: "Literal", value: "\"start", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 8}}},
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 8}, end: {line: 1, column: 9}}},
			{type: "Key", value: "tests", loc: {start: {line: 1, column: 9}, end: {line: 1, column: 14}}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 14}, end: {line: 1, column: 15}}},
			{type: "Literal", value: "end\"", loc: {start: {line: 1, column: 15}, end: {line: 1, column: 19}}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 19}, end: {line: 1, column: 20}}}
		]);
	});

	it("should tokenize literals with escaped double quotes inside of them", function () {
		expect(tokenize("{\"lorem \\\" ipsum\"}")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}},
			{type: "Literal", value: "\"lorem \\\" ipsum\"", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 18}}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 18}, end: {line: 1, column: 19}}}
		]);
	});

	it("should tokenize non-syntax characters as buffers", function () {
		expect(tokenize("<h1>{hello},{world}!</h1>")).to.deep.equal([
			{type: "Buffer", value: "<h1>", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 5}}},
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 5}, end: {line: 1, column: 6}}},
			{type: "Key", value: "hello", loc: {start: {line: 1, column: 6}, end: {line: 1, column: 11}}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 11}, end: {line: 1, column: 12}}},
			{type: "Buffer", value: ",", loc: {start: {line: 1, column: 12}, end: {line: 1, column: 13}}},
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 13}, end: {line: 1, column: 14}}},
			{type: "Key", value: "world", loc: {start: {line: 1, column: 14}, end: {line: 1, column: 19}}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 19}, end: {line: 1, column: 20}}},
			{type: "Buffer", value: "!</h1>", loc: {start: {line: 1, column: 20}, end: {line: 1, column: 26}}}
		]);
	});

	it("should tokenize whitespace inside of syntax", function () {
		expect(tokenize("{ \t\v\f\u00A0\uFEFFa }")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}},
			{type: "Whitespace", value: " \t\v\f\u00A0\uFEFF", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 8}}},
			{type: "Key", value: "a", loc: {start: {line: 1, column: 8}, end: {line: 1, column: 9}}},
			{type: "Whitespace", value: " ", loc: {start: {line: 1, column: 9}, end: {line: 1, column: 10}}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 10}, end: {line: 1, column: 11}}}
		]);
	});

	it("should tokenize filters", function () {
		expect(tokenize("{test|js|fake}")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}},
			{type: "Key", value: "test", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 6}}},
			{type: "Punctuator", value: "|", loc: {start: {line: 1, column: 6}, end: {line: 1, column: 7}}},
			{type: "Key", value: "js", loc: {start: {line: 1, column: 7}, end: {line: 1, column: 9}}},
			{type: "Punctuator", value: "|", loc: {start: {line: 1, column: 9}, end: {line: 1, column: 10}}},
			{type: "Key", value: "fake", loc: {start: {line: 1, column: 10}, end: {line: 1, column: 14}}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 14}, end: {line: 1, column: 15}}}
		]);
	});

	describe("token", function () {
		context("toString", function () {
			it("should return the value", function () {
				const token = tokenize("{")[0];
				expect(token.toString()).to.equal("{");
			});
		});
	});
});

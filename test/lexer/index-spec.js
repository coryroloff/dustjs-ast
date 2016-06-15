"use strict";

import {expect} from "chai";
import tokenize from "../../lib/lexer";
import alphabet from "alphabet";

describe("tokenizer", function () {
	for (let char of alphabet.concat(["_", "$"])) {
		it(`should tokenize when character has prefix: ${char}`, function () {
			expect(tokenize(`{${char}char}`)).to.deep.equal([
				{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}, range: {start: 1, end: 2}},
                {type: "Key", value: `${char}char`, loc: {start: {line: 1, column: 2}, end: {line: 1, column: 7}}, range: {start: 2, end: 7}},
				{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 7}, end: {line: 1, column: 8}}, range: {start: 7, end: 8}}
			]);
		});
	}

	for (let char of ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) {
		it(`should not tokenize when character has prefix: ${char}`, function () {
			expect(() => tokenize(`{${char}char}`)).to.throw();
		});
	}

	it("should parse paths of keys and punctuators (.)", function () {
		expect(tokenize("{one.two.three}")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}, range: {start: 1, end: 2}},
			{type: "Key", value: "one", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 5}}, range: {start: 2, end: 5}},
			{type: "Punctuator", value: ".", loc: {start: {line: 1, column: 5}, end: {line: 1, column: 6}}, range: {start: 5, end: 6}},
			{type: "Key", value: "two", loc: {start: {line: 1, column: 6}, end: {line: 1, column: 9}}, range: {start: 6, end: 9}},
			{type: "Punctuator", value: ".", loc: {start: {line: 1, column: 9}, end: {line: 1, column: 10}}, range: {start: 9, end: 10}},
			{type: "Key", value: "three", loc: {start: {line: 1, column: 10}, end: {line: 1, column: 15}}, range: {start: 10, end: 15}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 15}, end: {line: 1, column: 16}}, range: {start: 15, end: 16}}
		]);
	});

	it("should tokenize comments with quotes and other syntax", function () {
		expect(tokenize("{! hello \" {one} {#hey}{/hey} !}")).to.deep.equal([
			{type: "Comment", value: " hello \" {one} {#hey}{/hey} ", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 34}}, range: {start: 1, end: 34}}
		]);
	});

	it("should tokenize references in literals", function () {
		expect(tokenize("{\"start{tests}end\"}")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}, range: {start: 1, end: 2}},
			{type: "Literal", value: "\"start", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 8}}, range: {start: 2, end: 8}},
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 8}, end: {line: 1, column: 9}}, range: {start: 8, end: 9}},
			{type: "Key", value: "tests", loc: {start: {line: 1, column: 9}, end: {line: 1, column: 14}}, range: {start: 9, end: 14}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 14}, end: {line: 1, column: 15}}, range: {start: 14, end: 15}},
			{type: "Literal", value: "end\"", loc: {start: {line: 1, column: 15}, end: {line: 1, column: 19}}, range: {start: 15, end: 19}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 19}, end: {line: 1, column: 20}}, range: {start: 19, end: 20}}
		]);
	});

	it("should tokenize literals with escaped double quotes inside of them", function () {
		expect(tokenize("{\"lorem \\\" ipsum\"}")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}, range: {start: 1, end: 2}},
			{type: "Literal", value: "\"lorem \\\" ipsum\"", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 18}}, range: {start: 2, end: 18}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 18}, end: {line: 1, column: 19}}, range: {start: 18, end: 19}}
		]);
	});

	it("should tokenize non-syntax characters as buffers", function () {
		expect(tokenize("<h1>{hello},{world}!</h1>")).to.deep.equal([
			{type: "Buffer", value: "<h1>", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 5}}, range: {start: 1, end: 5}},
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 5}, end: {line: 1, column: 6}}, range: {start: 5, end: 6}},
			{type: "Key", value: "hello", loc: {start: {line: 1, column: 6}, end: {line: 1, column: 11}}, range: {start: 6, end: 11}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 11}, end: {line: 1, column: 12}}, range: {start: 11, end: 12}},
			{type: "Buffer", value: ",", loc: {start: {line: 1, column: 12}, end: {line: 1, column: 13}}, range: {start: 12, end: 13}},
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 13}, end: {line: 1, column: 14}}, range: {start: 13, end: 14}},
			{type: "Key", value: "world", loc: {start: {line: 1, column: 14}, end: {line: 1, column: 19}}, range: {start: 14, end: 19}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 19}, end: {line: 1, column: 20}}, range: {start: 19, end: 20}},
			{type: "Buffer", value: "!</h1>", loc: {start: {line: 1, column: 20}, end: {line: 1, column: 26}}, range: {start: 20, end: 26}}
		]);
	});

	it("should tokenize whitespace inside of syntax", function () {
		expect(tokenize("{ \t\v\f\u00A0\uFEFFa }")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}, range: {start: 1, end: 2}},
			{type: "Whitespace", value: " \t\v\f\u00A0\uFEFF", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 8}}, range: {start: 2, end: 8}},
			{type: "Key", value: "a", loc: {start: {line: 1, column: 8}, end: {line: 1, column: 9}}, range: {start: 8, end: 9}},
			{type: "Whitespace", value: " ", loc: {start: {line: 1, column: 9}, end: {line: 1, column: 10}}, range: {start: 9, end: 10}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 10}, end: {line: 1, column: 11}}, range: {start: 10, end: 11}}
		]);
	});

	it("should tokenize filters", function () {
		expect(tokenize("{test|js|fake}")).to.deep.equal([
			{type: "Punctuator", value: "{", loc: {start: {line: 1, column: 1}, end: {line: 1, column: 2}}, range: {start: 1, end: 2}},
			{type: "Key", value: "test", loc: {start: {line: 1, column: 2}, end: {line: 1, column: 6}}, range: {start: 2, end: 6}},
			{type: "Punctuator", value: "|", loc: {start: {line: 1, column: 6}, end: {line: 1, column: 7}}, range: {start: 6, end: 7}},
			{type: "Key", value: "js", loc: {start: {line: 1, column: 7}, end: {line: 1, column: 9}}, range: {start: 7, end: 9}},
			{type: "Punctuator", value: "|", loc: {start: {line: 1, column: 9}, end: {line: 1, column: 10}}, range: {start: 9, end: 10}},
			{type: "Key", value: "fake", loc: {start: {line: 1, column: 10}, end: {line: 1, column: 14}}, range: {start: 10, end: 14}},
			{type: "Punctuator", value: "}", loc: {start: {line: 1, column: 14}, end: {line: 1, column: 15}}, range: {start: 14, end: 15}}
		]);
	});
});

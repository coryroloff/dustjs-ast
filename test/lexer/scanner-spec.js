"use strict";

import {expect} from "chai";
import Scanner from "../../lib/lexer/scanner";

describe("scanner", function () {
	let scanner;

	beforeEach(function () {
		scanner = new Scanner("12345");
	});

	context("constructor", function () {
		it("should set code as an array of characters from the original string", function () {
			expect(scanner.code).to.deep.equal(["1", "2", "3", "4", "5"]);
		});

		it("should start index at 0", function () {
			expect(scanner.index).to.equal(0);
		});

		it("should set lineNumber to 0 if an empty string is given", function () {
			expect(new Scanner("").lineNumber).to.equal(0);
		});

		it("should default lineStart to 1", function () {
			expect(scanner.lineStart).to.equal(1);
		});

		it("should offset index, lineNumber, lineStart not not 0", function () {
			const scanner = new Scanner("12345", {
				indexOffset: 3,
				lineNumberOffset: 3,
				lineStartOffset: 3
			});

			expect(scanner.index).to.equal(2);
			expect(scanner.lineNumber).to.equal(3);
			expect(scanner.lineStart).to.equal(3);
		});
	});

	context("isLineTerminator", function () {
		for (const char of ["\n", "\r", "\r\n", "\u2028", "\u2029"]) {
			it(`should return true for: ${char}`, function () {
				expect(scanner.isLineTerminator(char)).to.be.true;
			});
		}

		it("should return false if not a line ending", function () {
			expect(scanner.isLineTerminator("A")).to.be.false;
		});
	});

	context("next", function () {
		it("should read each character, move the cursor, and return done at the end", function () {
			expect(scanner.next()).to.deep.equal({value: "1", done: false});
			expect(scanner.index).to.equal(1);
			expect(scanner.next()).to.deep.equal({value: "2", done: false});
			expect(scanner.index).to.equal(2);
			expect(scanner.next()).to.deep.equal({value: "3", done: false});
			expect(scanner.index).to.equal(3);
			expect(scanner.next()).to.deep.equal({value: "4", done: false});
			expect(scanner.index).to.equal(4);
			expect(scanner.next()).to.deep.equal({value: "5", done: false});
			expect(scanner.index).to.equal(5);
			expect(scanner.next()).to.deep.equal({value: undefined, done: true});
			expect(scanner.index).to.equal(6);
		});

		for (const char of ["\n", "\r", "\r\n", "\u2028", "\u2029"]) {
			it.skip(`should increment the line number and line start when it hits a new line: ${char}`, function () {
				const scanner = new Scanner(`ab${char}c`);
				scanner.next();
				expect(scanner.lineNumber).to.equal(1);
				expect(scanner.lineStart).to.equal(1);
				scanner.next();
				scanner.next();
				expect(scanner.lineNumber).to.equal(2);
				expect(scanner.lineStart).to.equal(3);
				expect(scanner.index).to.equal(3);
			});
		}
	});

	context("peek", function () {
		it("should return the next available character without moving the cursor", function () {
			expect(scanner.peek()).to.equal("1");
			expect(scanner.index).to.equal(0);
			expect(scanner.char).to.be.null;
		});

		it("should return undefined if at the end of the string", function () {
			const scanner = new Scanner("a");
			scanner.next();
			expect(scanner.peek()).to.be.undefined;
		});
	});
});

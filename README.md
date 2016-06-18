# dustjs-ast [![Build Status](https://travis-ci.org/coryroloff/dustjs-ast.svg?branch=master)](https://travis-ci.org/coryroloff/dustjs-ast) [![Coverage Status](https://coveralls.io/repos/github/coryroloff/dustjs-ast/badge.svg?branch=master)](https://coveralls.io/github/coryroloff/dustjs-ast?branch=master)

A custom abstract syntax tree for Dust.js.

## Installation

```shell
npm install --save dustjs-ast
```

## Usage

```js
import dust from "dustjs-ast";

const code = "<h1>{hello}, {world}!</h1>";

dust.lex(code);
dust.parse(code);
```

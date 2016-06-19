# dustjs-ast [![Build Status](https://travis-ci.org/coryroloff/dustjs-ast.svg?branch=master)](https://travis-ci.org/coryroloff/dustjs-ast) [![Coverage Status](https://coveralls.io/repos/github/coryroloff/dustjs-ast/badge.svg?branch=master)](https://coveralls.io/github/coryroloff/dustjs-ast?branch=master)

A custom abstract syntax tree for Dust.js.

## Installation

```shell
npm install --save dustjs-ast
```

## Usage

```js
import {default as dust, Token, Node} from "dustjs-ast";

dust.parse("<h1>{hello}, {world}!</h1>");
```

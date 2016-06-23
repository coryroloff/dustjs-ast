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

## API

### Buffer ⇒ `Node`

| Property | Type                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------- |
| text     | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Key ⇒ `Node`

| Property | Type                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------- |
| name     | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Node

| Property         | Type                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| type             | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| loc.start.line   | [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| loc.start.column | [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| loc.end.line     | [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| loc.end.column   | [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |

| Constant   | Type                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------- |
| Block      | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Buffer     | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Comment    | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Identifier | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Inline     | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Key        | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Literal    | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| NamedBlock | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Param      | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Partial    | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Raw        | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Reference  | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Section    | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Special    | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Template   | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Raw ⇒ `Node`

| Property | Type                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------- |
| text     | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Reference ⇒ `Node`

| Property | Type         |
| -------- | ------------ |
| id       | `Identifier` |
| filters  | `Array<Key>` |

### Section ⇒ `Block`

| Property | Type                                                                                                |
| -------- | --------------------------------------------------------------------------------------------------- |
| kind     | [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| id       | `Identifier`                                                                                        |
| context  | `Identifier`                                                                                        |
| params   | `Array<Param>`                                                                                      |

### Special ⇒ `Node`

| Property | Type  |
| -------- | ----- |
| key      | `Key` |

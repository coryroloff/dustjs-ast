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

<!-- API: start -->

### Block ⇒ Node

| Property | Type                                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| body     | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Node&gt; |

### Buffer ⇒ Node

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| text     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Comment ⇒ Node

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| text     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Identifier ⇒ Node

| Property     | Type                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| path         | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Key&gt; |
| localContext | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)        |

### Inline ⇒ Block

### Key ⇒ Node

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| name     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Literal ⇒ Node

| Property | Type                                                                                                                                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |

### NamedBlock ⇒ Block

| Property | Type |
| -------- | ---- |
| key      | Key  |

### Node

| Property         | Type                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| type             | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| loc.start.line   | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| loc.start.column | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| loc.end.line     | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| loc.end.column   | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |

| Constant   | Type                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Block      | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Buffer     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Comment    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Identifier | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Inline     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Key        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Literal    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| NamedBlock | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Param      | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Partial    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Raw        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Reference  | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Section    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Special    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Template   | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Param ⇒ Node

| Property | Type                        |
| -------- | --------------------------- |
| key      | Key                         |
| value    | Identifier, Inline, Literal |

### Partial ⇒ Node

A Partial is defined as matching a opening brace followed by a > plus anything that matches with key or inline plus context plus params followed by slash and closing brace.

| Property | Type                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| value    | Key, Inline, Literal                                                                                         |
| context  | Identifier                                                                                                   |
| params   | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Param&gt; |

### Raw ⇒ Node

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| text     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Reference ⇒ Node

| Property | Type                                                                                                       |
| -------- | ---------------------------------------------------------------------------------------------------------- |
| id       | Identifier                                                                                                 |
| filters  | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Key&gt; |

### Section ⇒ Block

| Property | Type                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| kind     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)            |
| id       | Identifier                                                                                                   |
| context  | Identifier                                                                                                   |
| params   | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Param&gt; |

| Constant      | Type                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- |
| Standard      | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Exists        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| NotExists     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| InlinePartial | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Block         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Helper        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Pragma        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Special ⇒ Node

| Property | Type |
| -------- | ---- |
| key      | Key  |

### Template ⇒ Block

| Property | Type                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| tokens   | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;Token&gt; |

### Token

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| type     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

| Constant   | Type                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------- |
| Comment    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Key        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Literal    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Punctuator | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Format     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Buffer     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Raw        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

<!-- API: end -->

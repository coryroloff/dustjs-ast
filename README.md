# dustjs-ast [![Build Status](https://travis-ci.org/coryroloff/dustjs-ast.svg?branch=master)](https://travis-ci.org/coryroloff/dustjs-ast) [![Coverage Status](https://coveralls.io/repos/github/coryroloff/dustjs-ast/badge.svg?branch=master)](https://coveralls.io/github/coryroloff/dustjs-ast?branch=master)

A custom abstract syntax tree for Dust.js.

## Installation

```shell
npm install --save dustjs-ast
```

## Usage

```js
import {default as dust, Token, Node} from "dustjs-ast";

const ast = dust.parse("<h1>{hello}, {world}!</h1>"); //=> {type: "Template", ...}
dust.print(ast); //=> <h1>{hello}, {world}!</h1>
```

## API

<!-- API: start -->

### Block ⇒ [Node](#node)

| Property | Type                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| body     | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Node](#node)&gt; |

### Buffer ⇒ [Node](#node)

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| text     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Comment ⇒ [Node](#node)

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| text     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Format ⇒ [Node](#node)

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| text     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Identifier ⇒ [Node](#node)

| Property     | Type                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| path         | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Key](#key--node)&gt; |
| localContext | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                      |

### Inline ⇒ [Block](#block--node)

### Key ⇒ [Node](#node)

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| name     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### NamedBlock ⇒ [Block](#block--node)

| Property | Type              |
| -------- | ----------------- |
| key      | [Key](#key--node) |

### Node

| Property         | Type                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| type             | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| loc.start.line   | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| loc.start.column | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| loc.end.line     | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |
| loc.end.column   | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |

| Constant       | Type                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------- |
| Block          | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Buffer         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Comment        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Identifier     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Inline         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Key            | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| StringLiteral  | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| NumericLiteral | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| NamedBlock     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Param          | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Partial        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Raw            | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Reference      | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Section        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Special        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Template       | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### NumericLiteral ⇒ [Node](#node)

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| value    | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) |

### Param ⇒ [Node](#node)

| Property | Type                                                                                               |
| -------- | -------------------------------------------------------------------------------------------------- |
| key      | [Key](#key--node)                                                                                  |
| value    | [Identifier](#identifier--node), [Inline](#inline--block), [NumericLiteral](#numericliteral--node) |

### Partial ⇒ [Node](#node)

A Partial is defined as matching a opening brace followed by a > plus anything that matches with key or inline plus context plus params followed by slash and closing brace.

| Property | Type                                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| kind     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                            |
| value    | [Key](#key--node), [Inline](#inline--block)                                                                                  |
| context  | [Identifier](#identifier--node)                                                                                              |
| params   | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Param](#param--node)&gt; |

| Constant | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| Partial  | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Block    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Raw ⇒ [Node](#node)

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| text     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Reference ⇒ [Node](#node)

| Property | Type                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| id       | [Identifier](#identifier--node)                                                                                          |
| filters  | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Key](#key--node)&gt; |

### Section ⇒ [Block](#block--node)

| Property                   | Type                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| kind                       | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                              |
| id                         | [Identifier](#identifier--node)                                                                                                |
| context                    | ?[Identifier](#identifier--node)                                                                                               |
| params                     | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Param](#param--node)&gt;   |
| format.startTagAfterKind   | ?[Format](#format--node)                                                                                                       |
| format.startTagBeforeParam | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Format](#format--node)&gt; |
| format.startTagBeforeEnd   | ?[Format](#format--node)                                                                                                       |
| format.endTagAfterStart    | ?[Format](#format--node)                                                                                                       |
| format.endTagBeforeEnd     | ?[Format](#format--node)                                                                                                       |

| Constant      | Type                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------- |
| Standard      | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Exists        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| NotExists     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| InlinePartial | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Block         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Helper        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Pragma        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Special ⇒ [Node](#node)

| Property | Type              |
| -------- | ----------------- |
| key      | [Key](#key--node) |

### StringLiteral ⇒ [Node](#node)

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

### Template ⇒ [Block](#block--node)

| Property | Type                                                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| tokens   | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Token](#token)&gt; |

### Token

| Property | Type                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| type     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

| Constant       | Type                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------- |
| Comment        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Key            | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| StringLiteral  | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| NumericLiteral | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Punctuator     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Format         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Buffer         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |
| Raw            | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) |

<!-- API: end -->

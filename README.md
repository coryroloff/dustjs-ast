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

A Block is defined as a Node with a body (e.g. children).

| Property | Type                                                                                                                 | Description |
| -------- | -------------------------------------------------------------------------------------------------------------------- | ----------- |
| body     | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Node](#node)&gt; | &nbsp;      |

### Buffer ⇒ [Node](#node)

| Property | Type                                                                                              | Description |
| -------- | ------------------------------------------------------------------------------------------------- | ----------- |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |

### Comment ⇒ [Node](#node)

| Property | Type                                                                                              | Description |
| -------- | ------------------------------------------------------------------------------------------------- | ----------- |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |

### Format ⇒ [Node](#node)

| Property | Type                                                                                              | Description |
| -------- | ------------------------------------------------------------------------------------------------- | ----------- |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |

### Identifier ⇒ [Node](#node)

| Property     | Type                                                                                                                     | Description |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ | ----------- |
| path         | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Key](#key--node)&gt; | &nbsp;      |
| localContext | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                      | &nbsp;      |

### Inline ⇒ [Block](#block--node)

### Key ⇒ [Node](#node)

| Property | Type                                                                                              | Description |
| -------- | ------------------------------------------------------------------------------------------------- | ----------- |
| name     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |

### NamedBlock ⇒ [Block](#block--node)

| Property | Type              | Description |
| -------- | ----------------- | ----------- |
| key      | [Key](#key--node) | &nbsp;      |

### Node

| Property         | Type                                                                                              | Description |
| ---------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| type             | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| loc.start.line   | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | &nbsp;      |
| loc.start.column | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | &nbsp;      |
| loc.end.line     | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | &nbsp;      |
| loc.end.column   | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | &nbsp;      |

| Constant       | Type                                                                                              | Description |
| -------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| Block          | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Buffer         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Comment        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Identifier     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Inline         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Key            | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| StringLiteral  | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| NumericLiteral | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| NamedBlock     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Param          | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Partial        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Raw            | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Reference      | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Section        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Special        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Template       | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |

### NumericLiteral ⇒ [Node](#node)

| Property | Type                                                                                              | Description |
| -------- | ------------------------------------------------------------------------------------------------- | ----------- |
| value    | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | &nbsp;      |

### Param ⇒ [Node](#node)

| Property | Type                                                                                               | Description |
| -------- | -------------------------------------------------------------------------------------------------- | ----------- |
| key      | [Key](#key--node)                                                                                  | &nbsp;      |
| value    | [Identifier](#identifier--node), [Inline](#inline--block), [NumericLiteral](#numericliteral--node) | &nbsp;      |

### Partial ⇒ [Node](#node)

A Partial is defined as matching a opening brace followed by a > plus anything that matches with key or inline plus context plus params followed by slash and closing brace.

| Property           | Type                                                                                                                           | Description |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| kind               | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                              | &nbsp;      |
| value              | [Key](#key--node), [Inline](#inline--block)                                                                                    | &nbsp;      |
| context            | ?[Identifier](#identifier--node)                                                                                               | &nbsp;      |
| params             | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Param](#param--node)&gt;   | &nbsp;      |
| format.afterStart  | ?[Format](#format--node)                                                                                                       | &nbsp;      |
| format.beforeParam | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Format](#format--node)&gt; | &nbsp;      |
| format.beforeEnd   | ?[Format](#format--node)                                                                                                       | &nbsp;      |

| Constant | Type                                                                                              | Description |
| -------- | ------------------------------------------------------------------------------------------------- | ----------- |
| Partial  | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | >           |
| Block    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | +           |

### Raw ⇒ [Node](#node)

| Property | Type                                                                                              | Description                         |
| -------- | ------------------------------------------------------------------------------------------------- | ----------------------------------- |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | {\`**\_\_\_hello, world!\_\_\_**\`} |

### Reference ⇒ [Node](#node)

| Property | Type                                                                                                                     | Description                        |
| -------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| id       | [Identifier](#identifier--node)                                                                                          | {**reference**}                    |
| filters  | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Key](#key--node)&gt; | {reference&#124;**js**&#124;**s**} |

### Section ⇒ [Block](#block--node)

Note: A self-closed section will always have an empty body. Sections with start and end tags will always have at least one Block in the body.

| Property                   | Type                                                                                                                           | Description                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| kind                       | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                              | {**#**section}{/section}                                          |
| id                         | [Identifier](#identifier--node)                                                                                                | {#**section**}{/section}                                          |
| context                    | ?[Identifier](#identifier--node)                                                                                               | {#section:**one.two.three**}{/section}                            |
| params                     | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Param](#param--node)&gt;   | {#section **param1=1** **param2=2** **param3=3**}                 |
| format.startTagAfterStart  | ?[Format](#format--node)                                                                                                       | {#**___**section}{/section}                                       |
| format.startTagBeforeParam | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Format](#format--node)&gt; | {#section**___**param1=1**___**param2=2**___**param3=3}{/section} |
| format.startTagBeforeEnd   | ?[Format](#format--node)                                                                                                       | {#section**___**}{/section} and {#section**___**/}                |
| format.endTagAfterStart    | ?[Format](#format--node)                                                                                                       | {#section}{/**___**section}                                       |
| format.endTagBeforeEnd     | ?[Format](#format--node)                                                                                                       | {#section}{/section**___**}                                       |

| Constant      | Type                                                                                              | Description |
| ------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| Standard      | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | #           |
| Exists        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ?           |
| NotExists     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | ^           |
| InlinePartial | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | <           |
| Block         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | +           |
| Helper        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | @           |
| Pragma        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | %           |

### Special ⇒ [Node](#node)

| Property | Type              | Description |
| -------- | ----------------- | ----------- |
| key      | [Key](#key--node) | &nbsp;      |

### StringLiteral ⇒ [Node](#node)

| Property | Type                                                                                              | Description |
| -------- | ------------------------------------------------------------------------------------------------- | ----------- |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |

### Template ⇒ [Block](#block--node)

| Property | Type                                                                                                                   | Description |
| -------- | ---------------------------------------------------------------------------------------------------------------------- | ----------- |
| tokens   | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Token](#token)&gt; | &nbsp;      |

### Token

| Property | Type                                                                                              | Description |
| -------- | ------------------------------------------------------------------------------------------------- | ----------- |
| type     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |

| Constant       | Type                                                                                              | Description |
| -------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| Comment        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Key            | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| StringLiteral  | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| NumericLiteral | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Punctuator     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Format         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Buffer         | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |
| Raw            | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | &nbsp;      |

<!-- API: end -->

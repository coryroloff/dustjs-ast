```
Disclaimer: This project is unmaintined and was simply a learning experience on building a lexer/parser.
There are many better options to use than Dust.js for templating!
```

# dustjs-ast [![Build Status](https://travis-ci.org/coryroloff/dustjs-ast.svg?branch=master)](https://travis-ci.org/coryroloff/dustjs-ast) [![Coverage Status](https://coveralls.io/repos/github/coryroloff/dustjs-ast/badge.svg?branch=master)](https://coveralls.io/github/coryroloff/dustjs-ast?branch=master)

A custom abstract syntax tree for Dust.js.

## Installation

```shell
npm install --save dustjs-ast
```

## Usage

```js
import dust from "dustjs-ast";
```

### parse (code: String): Template

```js
dust.parse("<h1>{hello}, {world}!</h1>"); //=> {type: "Template", ...}
```

### print (node: Node): String

```js
dust.print(ast); //=> <h1>{hello}, {world}!</h1>
```

### traverse (node: Node, visitor: Object): void

```js
dust.traverse(ast, {
	Section (path) {
		// on enter
	},
	Partial: {
		enter (path) {
			// on enter
		},
		exit (path) {
			// on exit
		}
	}
});
```

### types

```js
import {types as t} from "dustjs-ast";

t.isSection(node)
t.isBlock(node)
t.isReference(node)
...
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

| Property | Type                                                                                              | Description                       |
| -------- | ------------------------------------------------------------------------------------------------- | --------------------------------- |
| value    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | {!**\_\_\_hello, world!\_\_\_**!} |

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
| format.endTagBeforeEnd     | ?[Format](#format--node)                                                                                                       | {#section}{/section`___`}                                       |

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

<!-- API: end -->

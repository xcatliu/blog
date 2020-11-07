---
date: 2014-10-08
categories:
  - 编程世界
tags:
  - AST
  - UglifyJS
  - JavaScript
---

# 抽象语法树在 JavaScript 中的应用

> 发表在美团技术博客上：http://tech.meituan.com/abstract-syntax-tree.html

## 抽象语法树是什么

> 在计算机科学中，抽象语法树（Abstract syntax tree 或者缩写为 AST），或者语法树（Syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。树上的每个节点都表示源代码中的一种结构。之所以说语法是「抽象」的，是因为这里的语法并不会表示出真实语法中出现的每个细节。<sup>[1]</sup>

果然比较抽象，不如先看几个例子：

## 抽象语法树举例

```js
foo = 'hello world';
/*
    +-------------+             
    |  assign(=)  |             
    +-------------+             
       X        X               
      X          X              
+-------+    +-----------------+
|  foo  |    |  'hello world'  |
+-------+    +-----------------+
*/
if (foo === true) {
  bar = 'hello world';
  alert(bar);
}
/*
                       +------+                                    
                       |  if  |                                    
                       +------+                                    
                        X    X                                     
                      X        X                                   
         +--------------+    +-------------+                       
         |  equal(===)  |    |  if_body    |                       
         +--------------+    +-------------+                       
         X        X              X         X                       
       X         X                X          X                     
+-------+   +--------+    +-------------+   +------------+         
|  foo  |   |  true  |    |  assign(=)  |   |  alert()   |         
+-------+   +--------+    +-------------+   +------------+         
                             X        X                  X         
                           X            X                  X       
                       +-------+   +-----------------+    +-------+
                       |  bar  |   |  'hello world'  |    |  bar  |
                       +-------+   +-----------------+    +-------+
*/
```

从上述两个例子可以看出，抽象语法树是将源代码根据其语法结构，省略一些细节（比如：括号没有生成节点），抽象成树形表达。

抽象语法树在计算机科学中有很多应用，比如编译器、IDE、压缩优化代码等。下面介绍一下抽象语法树在 JavaScript 中的应用。

## JavaScript 抽象语法树

构造 JavaScript 抽象语法树有多种工具，比如 [V8](https://github.com/v8/v8/blob/master/src/ast/ast.h)、[SpiderMonkey](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API)、[UglifyJS](http://lisperator.net/uglifyjs/) 等，这里重点介绍 UglifyJS。

### UglifyJS

UglifyJS<sup>[2]</sup> 是使用最广的 JavaScript 压缩工具之一，而且自身也是用 JavaScript 写的，使用它的方法很简单（需要 [Node.js](http://nodejs.org/) 环境）：

首先全局安装：

```shell
[sudo ]npm install -g uglify-js
```

然后就可以使用了：

```shell
uglifyjs -m srcFileName.js -o destFileName.min.js
```

关于 UglifyJS 的用法这里就不多介绍了，我们要做的是一些更有趣的事情。

### UglifyJS Tools

UglifyJS 提供了一些工具用于分析 JavaScript 代码，包括：

- parser，把 JavaScript 代码解析成抽象语法树
- code generator，通过抽象语法树生成代码
- mangler，混淆 JavaScript 代码
- scope analyzer，分析变量定义的工具
- tree walker，遍历树节点
- tree transformer，改变树节点

### 生成抽象语法树

使用 UglifyJS 生成抽象语法树很简单：

首先安装 UglifyJS 为 npm 包：

```shell
npm install uglify-js --save-dev
```

然后使用 parse 方法即可：

```js
var UglifyJS = require('uglify-js');
var ast = UglifyJS.parse('function sum(foo, bar){ return foo + bar; }');
```

这样生成的 ast 即为那一段代码的抽象语法树。那么我们怎么使用呢？

### 使用 mangler 压缩代码

使用 mangler 可以通过将局部变量都缩短成一个字符来压缩代码。

```js
var UglifyJS = require('uglify-js');

var ast = UglifyJS.parse('function sum(foo, bar){ return foo + bar; }');
ast.figure_out_scope();
ast.mangle_names();
console.log(ast.print_to_string());
// function sum(a,b){return a+b}
```

### 使用 walker 遍历抽象语法树

使用 walker 可以遍历抽象语法树，这种遍历是深度遍历。

```js
var UglifyJS = require('uglify-js');

var ast = UglifyJS.parse('function sum(foo, bar){ return foo + bar; }');
ast.figure_out_scope();
ast.walk(new UglifyJS.TreeWalker(function(node) {
    console.log(node.print_to_string());
}));
/*
function sum(foo,bar){return foo+bar}
function sum(foo,bar){return foo+bar}
sum
foo
bar
return foo+bar
foo+bar
foo
bar
*/
```

UglifyJS 已经提供了直接压缩代码的脚本，walker 看上去貌似也没啥用，那么这些工具有什么使用场景呢？

## 抽象语法树的应用

### 利用抽象语法树重构 JavaScript 代码

假如我们有重构 JavaScript 的需求，它们就派上用场啦。

下面考虑这样一个需求：

我们知道，`parseInt` 用于将字符串变成整数，但是它有第二个参数，表示以几进制识别字符串，若没有传第二个参数，则会自行判断，比如：

```js
parseInt('10.23');     // 10            转换成正整数
parseInt('10abc');     // 10            忽略其他字符
parseInt('10', 10);    // 10            转换成十进制
parseInt('10', 2);     // 2             转换成二进制
parseInt('0123');      // 83 or 123     不同浏览器不一样，低版本浏览器会转换成八进制
parseInt('0x11');      // 17            转换成十六进制
```

因为有一些情况是和我们预期不同的，所以建议任何时候都加上第二个参数。

下面希望有一个脚本，查看所有 `parseInt` 有没有第二个参数，没有的话加上第二个参数 10，表示以十进制识别字符串。

使用 UglifyJS 可以实现此功能：

```js
#! /usr/bin/env node

var U2 = require("uglify-js");

function replace_parseint(code) {
    var ast = U2.parse(code);
    // accumulate `parseInt()` nodes in this array
    var parseint_nodes = [];
    ast.walk(new U2.TreeWalker(function(node){
        if (node instanceof U2.AST_Call
            && node.expression.print_to_string() === 'parseInt'
            && node.args.length === 1) {
            parseint_nodes.push(node);
        }
    }));
    // now go through the nodes backwards and replace code
    for (var i = parseint_nodes.length; --i >= 0;) {
        var node = parseint_nodes[i];
        var start_pos = node.start.pos;
        var end_pos = node.end.endpos;
        node.args.push(new U2.AST_Number({
            value: 10
        }));
        var replacement = node.print_to_string({ beautify: true });
        code = splice_string(code, start_pos, end_pos, replacement);
    }
    return code;
}

function splice_string(str, begin, end, replacement) {
    return str.substr(0, begin) + replacement + str.substr(end);
}

// test it

function test() {
    if (foo) {
      parseInt('12342');
    }
    parseInt('0012', 3);
}

console.log(replace_parseint(test.toString()));

/*
function test() {
    if (foo) {
      parseInt("12342", 10);
    }
    parseInt('0012', 3);
}
*/
```

在这里，使用了 walker 找到 `parseInt` 调用的地方，然后检查是否有第二个参数，没有的话，记录下来，之后根据每个记录，用新的包含第二个参数的内容替换掉原内容，完成代码的重构。

也许有人会问，这种简单的情况，用正则匹配也可以方便的替换，干嘛要用抽象语法树呢？

答案就是，**抽象语法树是通过分析语法实现的，有一些正则无法（或者很难）做到的优势，比如，parseInt() 整个是一个字符串，或者在注释中，此种情况会被正则误判**：

```js
var foo = 'parseInt("12345")';
// parseInt("12345");
```

### 抽象语法树在美团中的应用

在美团前端团队，我们使用 YUI 作为前端底层框架，之前面临的一个实际问题是，模块之间的依赖关系容易出现疏漏。比如：

```js
YUI.add('mod1', function(Y) {
    Y.one('#button1').simulate('click');
    Y.Array.each(array, fn);
    Y.mod1 = function() {/**/};
}, '', {
    requires: [
        'node',
        'array-extras'
    ]
});
YUI.add('mod2', function(Y) {
    Y.mod1();
    // Y.io(uri, config);
}, '', {
    requires: [
        'mod1',
        'io'
    ]
});
```

以上代码定义了两个模块，其中 `mod1` 模拟点击了一下 `id` 为 `button1` 的元素，执行了 `Y.Array.each`，然后定义了方法 `Y.mod1`，最后声明了依赖 `node` 和 `array-extras`；`mod2` 执行了 `mod1` 中定义的方法，而`Y.io` 被注释了，最后声明了依赖 `mod1` 和 `io`。

此处 `mod1` 出现了两个常见错误，一个是 `simulate` 是 `Y.Node.prototype` 上的方法，容易忘掉声明依赖 `node-event-simulate`<sup>[3]</sup>，另一个是 `Y.Array` 上只有部分方法需要依赖 `array-extras`，故此处多声明了依赖 `array-extras`<sup>[4]</sup>；`mod2` 中添加注释后，容易忘记删除原来写的依赖 `io`。

故正确的依赖关系应该如下：

```js
YUI.add('mod1', function(Y) {
    Y.one('#button1').simulate('click');
    Y.Array.each(array, fn);
    Y.mod1 = function() {/**/};
}, '', {
    requires: [
        'node',
        'node-event-simulate'
    ]
});
YUI.add('mod2', function(Y) {
    Y.mod1();
    // Y.io(uri, config);
}, '', {
    requires: [
        'mod1'
    ]
});
```

为了使模块依赖关系的检测自动化，我们创建了模块依赖关系检测工具，它利用抽象语法树，分析出定义了哪些接口，使用了哪些接口，然后查找这些接口应该依赖哪些模块，进而找到模块依赖关系的错误，大致的过程如下：

1. 找到代码中模块定义（`YUI.add`）的部分
2. 分析每个模块内函数定义，变量定义，赋值语句等，找出符合要求（以 `Y` 开头）的输出接口（如 `mod1` 中的 `Y.mod1`）
3. 生成「接口 - 模块」对应关系
4. 分析每个模块内函数调用，变量使用等，找出符合要求的输入接口（如 `mod2` 中的 `Y.one`，`Y.Array.each`，`Y.mod1`）
5. 通过「接口 - 模块」对应关系，找到此模块应该依赖哪些其他模块
6. 分析 requires 中是否有错误

使用此工具，保证每次提交代码时，依赖关系都是正确无误的，它帮助我们实现了模块依赖关系检测的自动化。

## 总结

抽象语法树在计算机领域中应用广泛，以上仅讨论了抽象语法树在 JavaScript 中的一些应用，期待更多的用法等着大家去尝试和探索。

## Reference

1. [Wikipedia AST][1]
2. [UglifyJS][2]
3. [node-event-simulate][3]
4. [Y.Array.each][4]

[1]: http://en.wikipedia.org/wiki/Abstract_syntax_tree
[2]: http://lisperator.net/uglifyjs/
[3]: http://yuilibrary.com/yui/docs/api/files/node_js_node-event-simulate.js.html#l1
[4]: http://yuilibrary.com/yui/docs/api/classes/Array.html#method_each

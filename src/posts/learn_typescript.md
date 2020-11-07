---
categories:
  - 编程世界
tags:
  - TypeScript
  - JavaScript
---

# Learn TypeScript

> TypeScript 是 JavaScript 的一个超集，由 Microsoft 开发，代码开源于 GitHub 上。

2016-05-20 更新：打算写成一个系列，放到独立的 repo 中，此篇会拆分为系列的一部分，在此仅做存档。

它的第一个版本发布于 2012 年 10 月，经历了多次更新后，现在已成为前端社区中不可忽视的力量，不仅在 Microsoft 内部得到广泛运用，而且连 Google 的 Angular2 也使用了 TypeScript 作为开发语言。

## Getting Start

首先我们使用 npm 安装 TypeScript 的编译工具：

```shell
npm install -g typescript
```

安装完成之后，就有了 `tsc` 命令。

> Tip: 我们约定使用 TypeScript 编写的文件以 .ts 为后缀。

将以下代码复制到 `greeter.ts` 中：

```ts
function greeter(person: string) {
    return "Hello, " + person;
}

var user = "Jane User";

document.body.innerHTML = greeter(user);
```

然后执行

```shell
tsc greeter.ts
```

这时候会生成一个编译好的文件 `greeter.js`：

```js
function greeter(person) {
    return "Hello, " + person;
}
var user = "Jane User";
document.body.innerHTML = greeter(user);
```

编译前的文件中，我们用 `:` 指定变量类型为 `string`，但是编译为 js 之后，并没有什么检查的代码被插入进来。

> Tip: TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。

下面尝试把这段代码编译一下：

```ts
function greeter(person: string) {
    return "Hello, " + person;
}

var user = [0, 1, 2];

document.body.innerHTML = greeter(user);
```

编译的时候，报了如下错误：

```shell
greeter.ts(7,35): error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

但是还是生成了 js 文件：

```js
function greeter(person) {
    return "Hello, " + person;
}
var user = [0, 1, 2];
document.body.innerHTML = greeter(user);
```

> Tip: TypeScript 编译的时候即使报错了，还是会生成编译结果，你仍然可以使用这个编译之后的文件。

TypeScript 支持定义 `interface` 和 `class`，将在后面的章节具体介绍。

> Tip: TypeScript 支持 es2015 的语法。

## Basic Types

TypeScript 提供了一系列数据结构，这是 TypeScript 的核心内容，他们的使用方式如下：

```ts
// Boolean
var isDone: boolean = false;

// Number
var height: number = 6;

// String
var name: string = "bob";
name = 'smith';

// Array
var list:number[] = [1, 2, 3];
var list:Array<number> = [1, 2, 3];

// Enum
enum Color {Red = 1, Green, Blue};
var c: Color = Color.Green;

enum Color {Red = 1, Green, Blue};
var c: Color = Color.Green;

enum Color {Red = 1, Green = 2, Blue = 4};
var c: Color = Color.Green;

enum Color {Red = 1, Green, Blue};
var colorName: string = Color[2];
alert(colorName);

// Any
var notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

var list:any[] = [1, true, "free"];
list[1] = 100;

// Void
function warnUser(): void {
    alert("This is my warning message");
}
```

> Tip: 使用 `:` 指定变量的类型，`:` 的前后有没有空格都可以。

以上是所有 TypeScript 提供的 Basic Types，其中只有 Enum 可能前端工程师用的比较少。

Enumeration 是枚举类型，常用于固定的取值被限定在一定范围内的场景，比如一周只能有七天，使用 C++ 实现的话：

```cpp
enum Weekday { sun, mon, tue, wed, thu, fri, sat };
Weekday today = mon;
// today == 1
```

Enum 中的变量会被赋值为数字，依次递增，在上面的例子中，`sun` 为 `0`，`sat` 为 `6`。

也可以手动赋值

```cpp
enum Weekday { sun = 7, mon = 1, tue, wed, thu, fri, sat };
// sun = 7, mon = 1, tue = 2, ... sat = 6
```

这样的话，`sun` 为 `7`，`mon` 为 `1`，`sat` 为 `6`。

参考：http://en.cppreference.com/w/cpp/language/enum

TypeScript 的语法和 C++ 类似，这段代码：

```ts
enum Color {Red = 1, Green = 2, Blue = 4};
var c: Color = Color.Green;
```

会被编译为：

```js
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
```

可以看出来，`Color` 将会是：`{ '1': 'Red', '2': 'Green', '4': 'Blue', Red: 1, Green: 2, Blue: 4 }`

> Tip: Enum 类型与 C++ 的用法类似。

> Tip: `void` 类型一般用于不返回任何内容的 `function`。

## Interfaces

Interface 用于定义复杂的类型的格式，比如对象，函数，数组，类，等等。

### Object

```ts
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

var myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

以上定义了 `interface LabelledValue`，它必须有一个 `label` 属性，并且 `label` 的类型必须是 `string`。

> Tip: interface 只定义了需要有的属性，而不管有没有其他属性。

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
  var newSquare = {color: "white", area: 100};
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

var mySquare = createSquare({color: "black"});
```

> Tip: 属性后面接着 `?` 表示可选的属性。

### Function

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
var mySearch: SearchFunc;
mySearch = function(src: string, sub: string) {
  var result = src.search(sub);
  if (result == -1) {
    return false;
  }
  else {
    return true;
  }
}
```

> Tip: 使用 `()` 表示对函数的格式定义，`:` 后面的表示函数的返回值的类型。

> Tip: 函数的变量名不需要和 Interface 中一模一样。

### Array

```ts
interface StringArray {
  [index: number]: string;
}

var myArray: StringArray;
myArray = ["Bob", "Fred"];

interface Dictionary {
  [index: string]: string;
  length: number;    // error, the type of 'length' is not a subtype of the indexer
}
```

> Tip: 使用 `[]` 表示对数组的格式定义，`:` 后面的表示数组每一项的类型。

> Tip: index 可以是 `string`，这时表示一个 `Dictinary`，它的每一项的值都必须和 `index` 定义的值一样。

参考：[how to use string indexed interface of typescript?](http://stackoverflow.com/questions/29043279/how-to-use-string-indexed-interface-of-typescript)

---
categories:
  - 编程世界
tags:
  - Array
  - JavaScript
---

# 从 isArray 谈起

怎么判断数组是前端面试经常被问到的一个问题，数组也是最难以准确判断的类型之一。今天咱们就来谈谈如何判断数组。

## typeof

`typeof` 是 JavaScript 中判断类型的运算符，语法如下<sup>[1][MDN typeof]</sup>：

```js
typeof operand
```

可是 `typeof` 返回的结果不尽如人意<sup>[2][es5 typeof]</sup>：

Type of val | Result
------------|------------
Undefined   | `"undefined"`
Null        | `"object"`
Boolean     | `"boolean"`
Number      | `"number"`
String      | `"string"`
Object (native and does not implement [[Call]]) | `"object"`
Object (native or host and does implement [[Call]]) | `"function"`
Object (host and does not implement [[Call]]) | Implementation-defined except may not be `"undefined"`, `"boolean"`, `"number"`, or `"string"`

对一个数组执行 `typeof`，总是会返回 `"object"`，

故 `typeof` 对判断数组无能为力，pass。

## instanceof

`instanceof` 是 JavaScript 中判断是否继承的运算符，语法如下<sup>[3][MDN instanceof]</sup>：

```js
object instanceof constructor
```

故可以通过 `instanceof` 判断数组：

```js
function isArray(obj) {
  return obj instanceof Array;
}
```

那么，`instanceof` 有什么弊端呢？

答案就是 `instanceof` 无法判断跨 frame 的数组类型：

```js
var iframe = document.createElement('iframe');
document.body.append(iframe);
var FrameArray = window.frames[window.frames.length-1].Array;
var array = new FrameArray();
console.log(array instanceof Array);
// false
```

于是，在 ES5 中有了 `Array.isArray`。

## Array.isArray

语法如下<sup>[4][MDN isArray]</sup>：

```js
Array.isArray(obj)
```

遗憾的是，`Array.isArray` 是 es5 的方法，并不兼容所有浏览器，ie9 以下浏览器都不支持<sup>[5][caniuse isArray]</sup>。

2009 年，Prototype.js 维护者 kangax 发现可以用 `Object.prototype.toString` 判断数组<sup>[6][kangax isArray]</sup>，终于给数组的判断画上了句号。

## Object.prototype.toString

`Object.prototype.toString` 的规则如下<sup>[7][MDN toString]</sup>：

> When the toString method is called, the following steps are taken:
>
> 1. If the this value is undefined, return "[object Undefined]".
> 2. If the this value is null, return "[object Null]".
> 3. Let O be the result of calling ToObject passing the this value as the argument.
> 4. Let class be the value of the [[Class]] internal property of O.
> 5. Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".

而数组的 `[[class]]` 值是 `"Array"`<sup>[8][MDN newArray]</sup>：

> 15.4.2.1 new Array ( [ item0 [ , item1 [ , … ] ] ] )  
> ...  
> The [[Class]] internal property of the newly constructed object is set to "Array".  
> ...

由此可知，`Object.prototype.toString` 可用来判断数组：

```js
function isArray(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
}
```

此方法给不支持 `Array.isArray` 的浏览器提供了判断数组的方式，结合原生方法，我们可以得到适用性比较强的 `isArray`：

```js
var isArray = Array.isArray || function(obj) {
	return Object.prototype.toString.call(obj) === '[object Array]';
};
```

## 对比其他类库

```js
// jQuery
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});
jQuery.type = function( obj ) {
	if ( obj == null ) {
		return obj + "";
	}
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call(obj) ] || "object" :
		typeof obj;
};
jQuery.isArray = Array.isArray || function( obj ) {
    return jQuery.type(obj) === "array";
};
```

```js
// YUI
var TYPES = {
    'undefined'        : 'undefined',
    'number'           : 'number',
    'boolean'          : 'boolean',
    'string'           : 'string',
    '[object Function]': 'function',
    '[object RegExp]'  : 'regexp',
    '[object Array]'   : 'array',
    '[object Date]'    : 'date',
    '[object Error]'   : 'error'
};
L.type = function(o) {
    return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? 'object' : 'null');
};
L.isArray = L._isNative(Array.isArray) ? Array.isArray : function (o) {
    return L.type(o) === 'array';
};
```

```js
// Prototype.js
var ARRAY_CLASS = '[object Array]';
function isArray(object) {
    return _toString.call(object) === ARRAY_CLASS;
}
var hasNativeIsArray = (typeof Array.isArray == 'function')
    && Array.isArray([]) && !Array.isArray({});
if (hasNativeIsArray) {
    isArray = Array.isArray;
}
```

```js
// underscore.js
var toString = Object.prototype.toString;
_.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
};
```

```js
// lodash.js
var isArray = nativeIsArray || function(value) {
    return value && typeof value == 'object' && typeof value.length == 'number' &&
        toString.call(value) == arrayClass || false;
};
```

其中，jQuery，Prototype.js 和 lodash.js 对数组判断比较严格，加了其他限制。其他的类库和咱们的一样。

说明通过 `Array.isArray` 结合 `Object.ptototype.toString` 来判断数组，基本不会有问题。

## iframe Object.prototype.toString or Array.isArray

JavaScript 中，`Object.prototype` 的方法都可以被重写，假如想想极端情况，一个熊孩子重写了 `Object.prototype.toString`，又重写了 `Array.isArray` 那岂不是上面的所有类库判断数组的方法都失效了？

经过测试确实如此，还好我们还有办法补救，以下即为 **终极判断数组** 方法：

```js
function isArray() {
    document.body.append(document.createElement('iframe'));
    var frame = window.frames[window.frames.length-1];
    var FrameArray = frame.Array;
    var FrameObject = frame.Object;
    return FrameArray.isArray || function(obj) {
        return FrameObject.prototype.toString.call(obj) === '[object Array]';
    }
}
```

通过创建一个新的 `iframe`，保证原生方法没有被重写，确实绝妙。

不过，实际情况下不会有熊孩子闲着蛋疼去修改 `Object.prototype.toString` 和 `Array.isArray` 的，所以此种方法判断数组，有点画蛇添足了，仅作为茶余饭后的思考。

## createElement 也被复写了

熊孩子：老湿，这个 iframe 方法确实厉害，但是假如我把 `document.createElement` 也复写了，怎么办呢？

老湿：熊孩子滚远点！

## Links

1. [MDN typeof][]
2. [es5 typeof][]
3. [MDN instanceof][]
4. [MDN isArray][]
5. [caniuse isArray][]
6. [kangax isArray][]
7. [MDN toString][]
8. [MDN newArray][]

[MDN typeof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
[es5 typeof]: http://www.ecma-international.org/ecma-262/5.1/#sec-11.4.3
[MDN instanceof]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
[MDN isArray]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
[caniuse isArray]: http://kangax.github.io/compat-table/es5/#Array.isArray
[kangax isArray]: http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
[MDN toString]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.2.4.2
[MDN newArray]: http://www.ecma-international.org/ecma-262/5.1/#sec-15.4.2.1

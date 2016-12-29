---
title: 六彩虹开发历程 01 - TypeScript 与 Koa 的结合
---

由于我比较擅长前端，所以决定先从前端下手。

但是很久没有接触前端的一些新技术了，在经过一番调研之后，我决定使用 Koa2 作为 web framework。

另外，在逐渐了解 TypeScript 的过程中，对它产生了好感。所以决定使用 TypeScript 替代以前熟悉的 ES6。

然而谁会知道，一个又一个的坑正在前方等着我。

## async & await

由于是第一次使用 Koa2，所以我想在使用 TypeScript 之前，先按官方文档写个 Hello World 出来。

在了解了一下 `generator` 和 `async` & `await` 的前世今生之后，完成了第一个 Hello World。虽然还并没有完全理解它们，但是相信随着项目的进行，我会对它们有更深的理解。

```js
const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

由于打算使用 TypeScript，所以不需要再用 Babel 编译 JavaScript 了，为了看到运行的效果，特地将 node 升级到了 v7.2.0，另外这里还需要使用 `--harmony` 才能支持 `async` & `await`

```shell
node --harmony index.js
```

## TypeScript

说实话比较惭愧，虽然我之前把 TypeScript 的学习过程总结成了一本书《From JavaScript to TypeScript》(https://github.com/xcatliu/from-javascript-to-typescript)，但是我从来没有独立完成过一个 TypeScript 的项目。这次也算是积累一些经验吧。

TypeScript 在今年八月份[发布了新的大版本 v2](https://zhuanlan.zhihu.com/p/21629069)，同时也提供了一种新的方式获取 type definitions，那就是 `@types`。

相比于之前的 TSD 和 Typings，`@types` 实在是太方便了。只需要用 npm 安装需要的类型定义模块即可：

```shell
npm install @types/koa
```

不需要任何其他的配置。

## 其他

写了个简单的 `tsconfig.json`，简单的拆分了一下模块，然后在 `package.json` 中写了一点 npm script，第一个 Hello World 版本就完成啦。

GitHub Tag: [v0.0.1](https://github.com/xcatliu/6rainbow/tree/v0.0.1)

## Links

- [如何评价 Node.js 的koa框架？](https://www.zhihu.com/question/25388201)
- [Koa 还是 Express？](https://cnodejs.org/topic/55815f28395a0c1812f18257)
- [Koa 2 TypeScript boilerplate](https://github.com/ft-interactive/koa2-typescript-boilerplate)
- [TypeScript 2.0 新特性一览](https://zhuanlan.zhihu.com/p/21629069)
- [The Future of Declaration Files](https://blogs.msdn.microsoft.com/typescript/2016/06/15/the-future-of-declaration-files/)

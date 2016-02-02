---
title: "npm-shrinkwrap"
permalink: npm-shrinkwrap
date: 2016-02-02 15:10:04
categories:
- Full Stack
tags:
- npm
---

> Lock down dependency versions

[上一次推崇了 Semantic Versioning](http://blog.xcatliu.com/2015/04/14/semantic-versioning-and-npm)，没想到这么快就打脸了。语义化版本号是把双刃剑，一方面能够通过 [Semantic Versioning 的规则](http://semver.org/)保持模块的更迭（修复 bug 和添加新功能），一方面又很容易造成不向前兼容的窘境，如果你需要一个非常稳定的生产环境，建议使用 `npm-shrinkwrap` 锁定所有依赖的版本号，使用方式：

```shell
npm shrinkwrap
```

TBC

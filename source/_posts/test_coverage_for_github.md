---
title: GitHub 上的测试覆盖率
categories:
- Programmer
tags:
- Coverage
- Test
- GitHub
---

开源项目的 README.md 中，一般都会在前面放上一些 badge，除了可以让读者快速的了解项目的一些信息以外，还为 README.md 添加了些许色彩。以 [Pagic](https://github.com/xcatliu/pagic) 为例：

![pagic test coverage](/assets/test_coverage_for_github/pagic.png)

上图中的 `build passing` 表示 [travis](https://travis-ci.org/xcatliu/pagic) build 通过了，用绿色背景显示，表明很安全。

`npm v0.4.1` 表示最新版本是 `v0.4.1`，用橙色背景显示，表明是不稳定的版本。

`downloads 165/month` 表示最近一个月 npm 里的下载数量为 165 次，用黄绿色背景显示，表明 165 次已经比较多了，但是还不算最好的成绩。

`coverage 100%` 表示测试覆盖率达到了 100%，用绿色背景显示，表明很安全。

介绍 GitHub 与 Travis CI 结合的文章已经很多了，本篇文章主要介绍一下测试覆盖率的概念以及如何将测试覆盖率的 badge 添加到 README.md 中。

<!-- more -->

## 统一 badge

首先，为了使 badge 显示统一，我建议使用 http://shields.io 添加 badge，它集成了大部分可能用到的 badge，使显示的样式一致了。

使用方式也很简单，比如 Pagic 的 Travis 的 badge 在 README.md 中就是：

```md
[![Build Status](https://img.shields.io/travis/xcatliu/pagic.svg)](https://travis-ci.org/xcatliu/pagic)
```

其他的 badge 可以参考 http://shields.io 里的说明添加即可。

## 测试覆盖率

顾名思义，测试覆盖率就是运行的测试覆盖了多少代码里的逻辑。

这里我们使用 [Istanbul](https://github.com/gotwarlost/istanbul) 这个工具来检测代码的测试覆盖率。

因为我们需要在 Travis 中运行测试覆盖率的检测，所以我们需要在项目中安装 Istanbul，而不是在全局安装:

```shell
npm install istanbul --save-dev
```

然后在 `package.json` 中的 `scripts` 里添加：

```json
"cover": "istanbul cover node_modules/mocha/bin/_mocha"
```

这个命令用于生成测试覆盖率报告，它也可以在本地运行，也可以在 Travis 里运行：

```shell
npm run cover
```

它将会先执行测试，然后生成一个 `coverage` 目录，里面有测试覆盖率报告，其中的 html 文件可以直接打开查看。当然运行的结果也会在终端中显示出来：

```shell
  Pagic
    constructor()
      ✓ should have config and plugins
  
  ...

  getLayout
    ✓ should return null if findParentDir returns null
    ✓ should return layout result


  27 passing (64ms)

=============================================================================
Writing coverage object [/Users/xcatliu/Workspace/pagic/coverage/coverage.json]
Writing coverage reports at [/Users/xcatliu/Workspace/pagic/coverage]
=============================================================================

=============================== Coverage summary ===============================
Statements   : 100% ( 73/73 )
Branches     : 100% ( 12/12 )
Functions    : 100% ( 10/10 )
Lines        : 100% ( 72/72 )
================================================================================
```

## 将测试覆盖率报告提交给 Coveralls

[Coveralls](https://coveralls.io/) 用于收集测试覆盖率报告，对于开源项目免费。我们的 badge 也是 Coveralls 提供的数据。

Coveralls 可以使用 GitHub 账号登录，登录之后可以[在这里](https://coveralls.io/repos/new)添加需要收集报告的 repo，那么我们如何将测试覆盖率报告通过 Travis CI 提交给 Coveralls 呢？

首先需要安装 `coveralls`：

```shell
npm install coveralls --save-dev
```

然后在 `package.json` 中的 `scripts` 里添加：

```json
"coveralls": "npm run cover -- --report lcovonly && cat ./coverage/lcov.info | coveralls"
```

然后在 `.travis.yml` 中添加：

```yml
after_success:
- npm run coveralls
```

一个完整的 `.travis.yml` 如下：

```yml
language: node_js
node_js:
- 6
branches:
  only:
  - master
install:
- npm install
script:
- npm test
after_success:
- npm run coveralls
```

那么下一次提交代码的时候就会将测试覆盖率报告提交给 Coveralls 啦，别忘了在 README.md 中添加 badge 哦：

```md
[![Coveralls](https://img.shields.io/coveralls/xcatliu/pagic.svg)](https://coveralls.io/github/xcatliu/pagic)
```

---
title: Puppeteer 指南
date: 2018-09-18
categories:
- Programmer
tags:
- JavaScript
- Puppeteer
---

Puppeteer 是 Google Chrome 出品的一个无头浏览器。如果你听说过 Phantomjs 或者 Selenium，那么就应该知道它是做什么的了。Puppeteer 与它们类似，提供了一系列 api，通过 DevTools 协议控制 Chromium/Chrome 浏览器的行为。

## 什么是无头浏览器

无头浏览器就是没有用户界面的浏览器，即通过写脚本来使用无头浏览器访问网站，还可以做一些点击等行为。

Puppeteer 一般使用无头的模式运行，这样的开销较小。当然也提供了使用完整的 Chromium/Chrome 来运行的模式。

## Puppeteer 能做什么

能够做几乎所有浏览器能做的事情。

- 网页截图，或生成 pdf
- 爬取 SPA 或 SSR 网站
- 自动化表单提交，UI测试，键盘输入等
- 创建一个最新的自动化测试环境。使用最新的 js 和最新的 Chrome 浏览器运行测试用例
- 捕获网站的时间线，帮助诊断性能问题
- 测试 Chrome 插件

## Puppeteer 与其他无头浏览器有什么区别？

- Puppeteer 由 Google Chrome 维护，速度快、安全、稳定、易用
- 其他无头浏览器可以支持多种浏览器环境（Safari, Chrome, Firefox 等），而 Puppeteer 只支持 Chromium/Chrome
- Puppeteer 有完善的事件系统，不需要频繁的 `sleep(1000)` 了
- Puppeteer 的调试功能很强大，还支持在 DevTools 里面调试
- Puppeteer 能够创建一个「真实」的行为，如点击

## 安装 Puppeteer

先创建一个测试用的项目，执行 `npm init` 初始化好 `package.json`，然后执行以下命令安装 Puppeteer：

```bash
npm install puppeteer --save-dev
```

万事开头难，第一步安装时就会遇到问题。

Puppeteer 安装过程中会去下载 Chromium，墙内用户则会报错。如果你看到以下信息，说明是下载 Chromium 时连接不上。

```bash
ERROR: Failed to download Chromium r588429! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.
Error: Download failed: server returned code 502. URL: https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/588429/chrome-win32.zip
```

或者

```bash
ERROR: Failed to download Chromium r588429! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.
{ Error: connect ETIMEDOUT 172.217.24.48:443
```

如提示所说，设置 `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` 可以跳过安装 Chromium。

```bash
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm install puppeteer --save-dev
```

此时可以安装成功，但是使用 Puppeteer 时会由于找不到 Chromium 而报错。可以创建一个文件 `test.js`，内容如下：

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
```

然后执行 `node test.js` 则会报错：

```bash
$ node test.js
(node:18368) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Chromium revision is not downloaded. Run "npm install" or "yarn install"
(node:18368) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

一个解决方案是先手动下载 Chromium，然后在执行时通过配置指定 Chromium 位置，[这篇文章](https://juejin.im/post/5b4a043751882519790c7ad7)给出了解决步骤。

但是我更倾向于还原 Puppeteer 安装时的过程。但是由于一些环境原因，即便翻墙了也只能手动下载 Chromium，无法在安装 Puppeteer 时自动下载 Chromium。

读了一下源码之后，可以这么解决：

1. 安装 Puppeteer，安装失败，提示无法下载 `https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/588429/chrome-win32.zip`
2. 使用 `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm install puppeteer --save-dev` 成功安装 Puppeteer
3. 执行 `node test.js` 提示无法找到 Chromium
4. 手动下载步骤 1 中的 `chrome-win32.zip`，注意不同版本、不同系统的下载地址是不一样的
5. 开启一个静态文件服务，使得 `http://127.0.0.1:8000/chrome-win32.zip` 指向需要下载的文件
6. 将 `./node_modules/puppeteer/lib/BrowserFetcher.js` 这个文件中的 `%s/chromium-browser-snapshots/Win_x64/%d/chrome-win32.zip` 替换为 `http://127.0.0.1:8000/chrome-win32.zip`
7. 搜索这个文件中的 `downloadURLs`，去掉对应的 `util.format` 的调用，使其直接使用 `downloadURLs[this._platform]`
8. 执行 `node ./node_modules/puppeteer/install.js` 完成安装
9. 执行 `node test.js` 测试能否成功生成截图

至此，成功完成了 Puppeteer 的安装。

## 未完待续

## 参考

- [Puppeteer 文档](https://pptr.dev/)

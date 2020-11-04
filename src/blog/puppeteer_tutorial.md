---
date: 2018-09-18
categories:
  - 编程世界
tags:
  - JavaScript
  - Puppeteer
---

# Puppeteer 指南

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

万事开头难，第一步安装时就会遇到问题（如果没有报错，请跳过这一段）。

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
6. 改写 `downloadURL` 方法，使其直接返回 `http://127.0.0.1:8000/chrome-win32.zip`
7. 执行 `node ./node_modules/puppeteer/install.js` 完成安装
8. 执行 `node test.js` 测试能否成功生成截图

至此，成功完成了 Puppeteer 的安装。

## Puppeteer 结构

Puppeteer 通过 DevTools 协议控制 Chromium/Chrome 浏览器。它的结构和浏览器结构类似。

> 下图中淡化显示的可以忽略

![Puppeteer 结构](../assets/puppeteer_turorial/puppeteer-structure.png)

- Puppeteer 通过 DevTools 协议控制 Chromium/Chrome 浏览器
- 一个浏览器（Browser）实例可以包含多个浏览器上下文（Browser contexts），就像我们打开一个普通的 Chrome 之后又打开一个隐身模式的 Chrome
- 一个浏览器上下文（BrowserContext）可以包含多个页面（Pages）
- 一个页面（Page）包含至少一个主 frame，也可以包含其他 frames（在主 frame 中通过 iframe 或 frame 标签创建的）
- 一个 frame 包含至少一个执行上下文（Execution context），也可以包含其他执行上下文（由 Chrome 插件创建的）
- 一个 Workder 包含一个执行上下文，由 WebWorker 创建

## Puppeteer API

Puppeteer 的大部分 API 的返回值都是 `Promise`，故推荐使用 `async` `await` 来处理异步操作。Puppeteer 的 API 包含以下类：

类名|描述
-----|-----
`Puppeteer`|主要用于创建一个浏览器实例，也可以用来下载新的 Chromium，或者设置浏览器的默认参数
`BrowserFetcher`|用于下载和管理 Chromium
`Browser`|可以创建一个或多个 Page
`BrowserContext`|创建一个隐身模式的浏览器时需要用到
`Page`|**主要 API，用于操作一个页面，后面会详细介绍**
`Worker`|用于处理 WebWorker
`Keyboard`|可以触发键盘按键
`Mouse`|可以触发鼠标动作
`TouchScreen`|可以触发触摸屏的动作
`Tracing`|用于分析性能
`Dialog`|存在于 page 的 `dialog` 事件回调中，表示调用弹窗后的对象，包括 `alert`, `beforeunload`, `confirm` 和 `prompt`
`ConsoleMessage`|存在于 page 的 `console` 事件回调中，表示调用 `console.log` 等方法后的对象
`Frame`|常用于处理包含多个 frame 的页面。page 中的很多方法就是直接调用的主 frame 的方法
`ExecutionContext`|执行上下文存在于 frame、浏览器插件、worker 中。可以用来直接执行一段 js
`JSHandle`|通过 `page.evaluateHandle` 生成，用于将页面中的 handler 挑出来传递使用
`ElementHandle`|通过 `page.$` 生成，用于将页面中某个元素的 handler 挑出来传递使用
`Request`|在 `page.setRequestInterception` 方法中使用，可以处理页面的请求
`Response`|表示页面接收到的响应
`SecurityDetails`|表示页面的安全信息
`Target`|可以是 page, background\_page, service\_worker, browser 等
`CDPSession`|用于直接和 Devtools 通信
`Coverage`|用于分析 js 和 css 的代码被页面使用的比例
`TimeoutError`|超时错误

### Page

Page 是 Puppeteer 中最重要的一个 API，也是它的核心所在，这里会介绍一些常用的 Page API。

#### 设置页面环境

方法名|描述
-----|-----
`page.emulate`|设置 viewport 和 ua
`page.setViewport`|设置 viewport
`page.setUserAgent`|设置 ua
`page.setRequestInterception`|**中断所有请求，并可以修改请求的返回值**
`page.addScriptTag`|添加 js 脚本
`page.addStyleTag`|添加 css
`page.setContent`|设置整个 html
`page.setCacheEnabled`|设置缓存是否开启
`page.setExtraHTTPHeaders`|设置额外的 http 头
`page.setGeolocation`|设置地理位置
`page.setJavaScriptEnabled`|设置 js 是否开启
`page.setOfflineMode`|设置离线模式
`page.deleteCookie`|删除 cookies
`page.setCookie`|设置 cookies

#### 模拟动作

一般会先滚动视窗到相应元素那，再执行动作。

方法名|描述
-----|-----
`page.click`|点击
`page.tap`|手指点击
`page.focus`|聚焦
`page.hover`|hover
`page.type`|在指定元素中输入内容
`page.select`|选中 `<select>` 的某个选项

#### 等待

方法名|描述
-----|-----
`page.waitFor`|等待某个元素渲染出来，或者某个函数执行之后返回 `true`，或者直接等待指定的时间
`page.waitForSelector`|等待某个元素被渲染
`page.waitForFunction`|等待某个函数执行之后返回 `true`
`page.waitForNavigation`|等待页面跳转
`page.waitForRequest`|等待某个特定的请求被发出
`page.waitForResponse`|等待某个特定的请求收到了回应

#### 执行脚本

方法名|描述
-----|-----
`page.$`|使用 `document.querySelector` 获取结果，会返回 `ElementHandle`，可以传递使用
`page.$$`|同上，不过使用的是 `document.querySelectorAll`
`page.$eval`|将 `document.querySelector` 获取的结果传递给 `pageFunction`
`page.$$eval`|同上，不过使用的是 `document.querySelectorAll`
`page.evaluate`|直接执行脚本
`page.evaluateHandle`|执行脚本，返回的是 `JSHandle`，可以传递使用
`page.evaluateOnNewDocument`|在下个 frame 执行脚本
`page.exposeFunction`|将函数注入到 `window` 对象上
`page.queryObjects`|获取所有属于这个类的对象，可以传递使用

#### 页面跳转

方法名|描述
-----|-----
`page.goto`|跳转页面
`page.close`|关闭
`page.goBack`|后退
`page.goForward`|前进
`page.reload`|刷新
`page.setDefaultNavigationTimeout`|设置页面跳转的超时时长

#### 获取内容

方法名|描述
-----|-----
`page.screenshot`|截屏
`page.pdf`|生成 pdf
`page.content`|获取整个页面内容
`page.title`|获取页面 title
`page.url`|获取页面 url
`page.viewport`|获取页面 viewport
`page.cookies`|获取 cookies

#### 事件

事件名|描述
-----|-----
`page.on('console')`|监听 `console.log` 等的调用
`page.on('dialog')`|监听页面的 `alert`, `beforeunload`, `confirm` 和 `prompt` 弹窗
`page.on('load')`|监听页面的加载
`page.on('domcontentloaded')`|监听页面 dom 加载完成
`page.on('pageerror')`|监听页面错误
`page.on('request')`|监听页面发送的请求
`page.on('requestfailed')`|监听失败的请求
`page.on('requestfinished')`|监听完成的请求
`page.on('response')`|监听页面接受到的响应

#### 命名空间

通过一些命名空间可以快速访问到该页面下的其他实例。

属性名|描述
-----|-----
`page.keyboard`|访问到页面的 Keyboard 对象
`page.mouse`|访问到页面的 Mouse 对象
`page.touchscreen`|访问到页面的 TouchScreen 对象

## Links

- [Puppeteer 文档](https://pptr.dev/)
- [Chromium CLI 参数](https://peter.sh/experiments/chromium-command-line-switches/)
- [预设的 EmulateOptions](https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js)

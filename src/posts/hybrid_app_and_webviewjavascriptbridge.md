---
date: 2014-10-27
categories:
  - 编程世界
tags:
  - Hybrid App
  - WebViewJavascriptBridge
  - JavaScript
---

# Hybrid App & WebViewJavascriptBridge

> Hybrid App（混合模式移动应用）是指介于 Web App 和 Native App 这两者之间的 App，兼具「Native App 良好用户交互体验的优势」和「Web App 跨平台开发的优势」。

## 实现原理

Hybrid App 的原理很简单——在原生应用中开启一个网页。可以是全屏都交给网页，或者是一部分（比如导航栏）由原生应用实现，另一部分是一个网页。

## 技术细节

### H5 页面的实现

作为前端，对这块应该已经很熟悉了，与传统的网页不同，H5 页面需要注意以下几点：

- 适应手机屏幕
    - viewport
    - 0.5px border
    - high resolution @2x @3x
- 控制页面大小
    - 模块化加载
    - 资源缓存
    - Loading 动画
- 兼容性
    - Android 和 iPhone 均为 Webkit 内核
    - 手机浏览器和应用中的 WebView 有区别（更多的是需要 Native 去处理）
    - 不同版本的 Android 有区别

以上问题可以带着关键字 Google 一下，一般均可以解决。

处理了以上的问题之后，一个简单的 H5 页面就可以实现出来了，接下来就是 WebView 和 Native 之间的交互。

### WebView 和 Native 之间的交互

与传统的网页不同，Hybrid 的优势在于 WebView 和 Native 之间可以交互。有如下几种成熟的解决方案：

- 自定义 scheme
- WebViewJavaScriptBridge

自定义 scheme 可以理解为，定义一种 xxx 协议，把网页中链接的地址设置为 xxx://do.something，当点击这个链接的时候，则会被 Native 截获，优点是简单，缺点是单向的。

WebViewJavaScriptBridge 则是在 WebView 的全局环境（window）中注入一个 bridge 对象，js 中需要对它进行初始化，监听事件，这样就可以接收到 Native 中发出的事件。同时 Native 中也监听了事件，可以收到 WebView 中发出的事件。这样就实现了双向的通信。

[WebViewJavaScriptBridge 的 iOS 实现](https://github.com/marcuswestin/WebViewJavascriptBridge)

[WebViewJavaScriptBeige 的 Android 实现](https://github.com/fangj/WebViewJavascriptBridge)

iOS 和 Android 端有各自的实现，不做介绍，只简单看看 JavaScript 端的实现：

```js
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}

connectWebViewJavascriptBridge(function(bridge) {

    /* Init your app here */

    bridge.init(function(message, responseCallback) {
        alert('Received message: ' + message)
        if (responseCallback) {
            responseCallback("Right back atcha")
        }
    })
    bridge.send('Hello from the javascript')
    bridge.send('Please respond to this', function responseCallback(responseData) {
        console.log("Javascript got its response", responseData)
    })
})
```

代码很简单，自己看吧。

### 建议通过 bridge 实现的功能

- 地理位置
- 摄像头
- 选取文件
- 等等

### 其他需要注意的问题

- 时效性
- 权限验证
- Android 可能会为了释放内存，杀掉 WebView 进程，所以最好能够保存当前页面的状态

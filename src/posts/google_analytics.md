---
categories:
  - 编程世界
tags:
  - Google Analytics
---

# Google Analytics 的 Tracking ID 不见了？

最近新创建了一个 Google Analytics 的 Property（媒体资源），但是找不到它的 Tracking ID 了。根据文档，需要创建一个 Data Stream，然后通过这样的方式引入一个被称为 `gtag.js` 的代码：

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FDL7K6SCFE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FDL7K6SCFE');
</script>
```

经过尝试，引入此资源（`https://www.googletagmanager.com/gtag/js?id=G-FDL7K6SCFE`）会加载另一个 js，插入到 `<head>` 中。

由于 [Pagic](https://github.com/xcatliu/pagic) 暂不支持以操作 dom 的方式来修改 `<head>`（仅支持在 React 中操作 `<head>`），所以我需要找到以前的 Tracking ID，然后通过这样的方式引入代码：

```jsx
<script async src="https://www.google-analytics.com/analytics.js" />
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.GoogleAnalyticsObject="ga";(window.ga=window.ga||function(){(window.ga.q=window.ga.q||[]).push(arguments);}),(window.ga.l=1*new Date());

      ga('create', '${id}', 'auto');
      ga('send', 'pageview');`
  }}
/>
```

经过一段不那么顺利的查找资料，我终于搞清楚了如何找到 Tracking ID。

## `analytics.js`, `gtag.js` 和 `ga.js` 有什么区别？

根据[这篇文章](https://daan.dev/wordpress/difference-analyics-gtag-ga-js/)介绍，

- `ga.js` 是 Google Analytics 最老的一个脚本，现在已经不推荐使用了
- `analytics.js` 是比较高级的一个脚本，它包含了 Google Analytics 的整个功能集
- `gtag.js` 是更高级更专业的一个脚本，如果你使用了其他基于 Google Analytics 的谷歌服务，那么可以使用 `gtag.js`

尽管 Google Analytics 官方将 `gtag.js` 视为更先进的版本（2020-10-14 后，默认创建的 Property 就是使用 `gtag.js` 的，而且还有一篇官方文章专门介绍[如何将 `analytics.js` 升级到 `gtag.js`](https://developers.google.com/analytics/devguides/collection/upgrade/analyticsjs)），但我们还是有充足的理由使用 `analytics.js`：

1. `gtag.js` 太专业了，大部分人只需要简单的 pv、uv、按钮点击上报
2. `gtag.js` 性能较差：
    - `gtag.js` 的链接带了一个小尾巴 `?id=G-FDL7K6SCFE`，这导致不同网站之间的资源不能在浏览器共享缓存
    - `gtag.js` 会异步加载 `analytics.js`，多了一次网络请求
    - `gtag.js` + `analytics.js` 总共占有 90kb 的大小，相比之下 `analytics.js` 只有 30kb

综上所述，`analytics.js` 应该是我们的首选。

## 那么新创建的 Property 如何找到 Tracking ID 呢？

如我之前所说，2020-10-14 后，默认创建的 Property 就是使用 `gtag.js` 的，它只包含 MEASUREMENT ID，没有 Tracking ID。

经过一番 google，终于在[这篇文章的评论区](https://analyticshelp.io/blog/google-analytics-property-tracking-id/)找到了：

1. 2020-10-14 前创建的 Property 是 GA3 版本，包含 Tracking ID，可以升级到 GA4 版本
2. 2020-10-14 后创建的 Property 是 GA4 版本，不包含 Tracking ID，而且无法降级
3. 创建 Property 时，可以勾选 **Show advanced options**，并且开启 **Create a Universal Analytics property**，这样就可以创建一个包含 Tracking ID 的旧版的 Property 了

至此，终于解决了找不到 Tracking ID 的问题了。

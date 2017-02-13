---
title: 三分钟创建一个简单精致的 About Me 页面
categories:
- Programmer
tags:
- About
- GitHub
- Jekyll
---

一个「About Me」页面，能够使别人快速的对你有一个大致的了解。

使用 GitHub 提供的 Pages 服务，可以将静态的网页托管在 GitHub 上。而 GitHub Pages 默认的 Jekyll 使得静态网页得以很方便的配置化。

我的 About Me 页面精雕细琢，并且页面的内容均提取成 yaml 配置文件，使大家可以简单几步就创建自己的 About Me 页面。

- [Live Demo](http://xcatliu.com/)
- [GitHub](https://github.com/xcatliu/xcatliu.github.io)

## 创建自己的页面

> 注意，下面使用 `{{ }}` 包装的部分需要替换为你自己的内容

1. Fork [这个仓库](https://github.com/xcatliu/xcatliu.github.io)
2. 将仓库名更新为 `{{ YOUR_GITHUB_ID }}.github.io`
3. 更新 `CNAME` 为 `{{ YOUR_DOMAIN }}`，并且在域名的 DNS Records 中，为它添加一个 CNAME 记录指向 `{{ YOUR_GITHUB_ID }}.github.io`（如果你没有域名，将此文件留空即可）
4. 更新 `_config.yml` 以及 `assets/img/` 中的图片资源
5. 打开 `{{ YOUR_DOMAIN }}` 看看吧！（如果你没有域名，请打开 `{{ YOUR_GITHUB_ID }}.github.io`）

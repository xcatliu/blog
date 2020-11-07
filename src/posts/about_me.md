---
categories:
  - 编程世界
tags:
  - GitHub
outdated: true
links:
  关于我: https://xcatliu.com
  GitHub: https://github.com/xcatliu/xcatliu
---

# 三分钟创建一个简单精致的 About Me 页面

> 通过 Fork 一个仓库，创建基于 GitHub Pages 的 About Me 页面。

一个「About Me」页面，能够使别人快速的对你有一个大致的了解。

使用 GitHub 提供的 Pages 服务，可以将静态的网页托管在 GitHub 上。而 GitHub Pages 默认的 Jekyll 使得静态网页得以很方便的配置化。

我的 About Me 页面精雕细琢，并且页面的内容均提取成 yaml 配置文件，使大家可以简单几步就创建自己的 About Me 页面。

## 特点

1. 托管在 GitHub Pages 上，不需要服务器，不需要注册域名（也可以绑定自己的域名）
2. 使用 GitHub Pages 上的 Jekyll 自动构建，不需要任何学习成本
3. 所有内容均配置化，一看就知道如何修改
4. GitHub Repos 的信息会自动抓取
5. 适配了桌面端和移动端，简单精致

## 创建自己的页面

> 注意，下面使用 `${}` 包装的部分需要替换为你自己的内容

1. Fork [这个仓库](https://github.com/xcatliu/xcatliu.github.io)
2. 将仓库名更新为 `${YOUR_GITHUB_ID}.github.io`
3. 更新 `CNAME` 为 `${YOUR_DOMAIN}`，并且在域名的 DNS Records 中，为它添加一个 CNAME 记录指向 `${YOUR_GITHUB_ID}.github.io`（如果你没有域名，将此文件留空即可）
4. 更新 `_config.yml` 以及 `assets/img/` 中的图片资源
5. 打开 `${YOUR_DOMAIN}` 看看吧！（如果你没有域名，请打开 `${YOUR_GITHUB_ID}.github.io`）

来创建自己的 About Me 页面吧！

---
categories:
  - 编程世界
tags:
  - Bootstrap
  - CSS
---

# Bootstrap 4 初探

Bootstrap 作为 GitHub 上 Stars 最多的项目，可以说是万众瞩目，issues 和 pull requests 也居高不下，足以看出其后劲依然很足。

截止到本文发布，Bootstrap 4 已经推出 alpha 2 版本一个多月了，让我们一起玩转 Bootstrap 4 吧！

## 新特性

先来看看 [Bootstrap 4 的新特性][bootstrap-4-alpha]：

### 使用 Sass 替代 Less

众多 css 预处理器里面，Sass 一直保持了最活跃的开发者社区，使用 Sass 替代 Less 想必是众望所归。

### 支持 Flexbox 了

允许用户构建 Bootstrap 的时候将 flexbox 设置为 true，这样网格系统和一些组件都使用 flexbox 布局啦。

当然兼容性上会存在很大问题，不过如果开发只支持高级浏览器的企业应用，就赶紧拥抱 flexbox 吧。

### 新组件 Cards

wells，thumbnails 和 panels 被废弃，使用 cards 替代。

### 提供更多自定义选项

使用 Reboot 替代 Normalize.css，提供了更多的自定义选项。

### 不再支持 IE8

虽然官方说不支持 IE8 了，但是 Bootstrap 4 在 IE8 下应该也不会有很多 bug，可能需要[一些兼容性的处理][browsers-devices]即可。

### 重写了 JavaScript 组件

然而还是基于 jQuery 开发，可能是为了适应更广大的用户群体吧。

### 主题市场

Bootstrap 推出了[官方的主题市场][themes]。

## Bootstrap 4 文档中值得关注的地方

我推荐大家把 [Bootstrap 4 文档][docs]阅读一遍，不过对于已经很熟悉 Bootstrap 3 的同学，可以只关注以下部分即可：

### 构建 Bootstrap

- [自定义配置](http://v4-alpha.getbootstrap.com/getting-started/options/)
- [Flexbox](http://v4-alpha.getbootstrap.com/getting-started/flexbox/)
- [如何构建](http://v4-alpha.getbootstrap.com/getting-started/build-tools/)
- [Reboot](http://v4-alpha.getbootstrap.com/content/reboot/)

**注意：margin-top 不使用了，只有 margin-bottom，这样的好处是单向的 margin 更容易控制**

### 移动支持

- [Responsive utilities](http://v4-alpha.getbootstrap.com/layout/responsive-utilities/)

### 新组件

- [Cards](http://v4-alpha.getbootstrap.com/components/card/)

### 其他

- [兼容性的干货](http://v4-alpha.getbootstrap.com/getting-started/browsers-devices/)
- [迁移](http://v4-alpha.getbootstrap.com/migration/)

## 如何关注 Bootstrap 4 项目

可以关注以下内容：

- [Bootstrap 新闻][news]
- [Bootstrap 4 的开发分支][dev]
- [Bootstrap Slack 讨论][slack]

## 总结

- 看得出来 Bootstrap 4 提供了很大的自由性，鼓励用户自己编译自己需要的版本
- Bootstrap 布局了 Theme 市场，相信社区会越来越活跃
- Bootstrap 4 摒弃了 IE8，支持了 flexbox，是时候一起推动 css 的迭代了

## Links

- [Bootstrap 新闻][news]
- [Bootstrap 4 alpha 文档][docs]
- [Bootstrap 4 新特性][bootstrap-4-alpha]
- [Bootstrap 4 开发分支][dev]
- [Bootstrap Slack 讨论][slack]
- [Bootstrap Themes][themes]

[bootstrap-4-alpha]: http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/
[browsers-devices]: http://v4-alpha.getbootstrap.com/getting-started/browsers-devices/
[themes]: http://themes.getbootstrap.com/
[docs]: http://v4-alpha.getbootstrap.com/
[dev]: https://github.com/twbs/bootstrap/tree/v4-dev
[slack]: https://bootstrap-slack.herokuapp.com/
[news]: http://blog.getbootstrap.com/

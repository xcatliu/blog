---
categories:
  - 编程世界
tags:
  - Hexo
  - JavaScript
links:
  v2ex: https://v2ex.com/t/289667
---

# 撸了两个 Hexo 的 Plugins

都是从 git log 获取数据填充到 posts 中：

## [hexo-filter-date-from-git]( https://github.com/xcatliu/hexo-filter-date-from-git)

- 获取 post 的第一个提交的 date 作为 front-matter 中的 `date`
- 获取 post 的最后一个提交的 date 作为 front-matter 中的 `updated`

### 解决的问题

hexo 中如果没有在 front-matter 中指定 `date`，则会读取文件的创建日期和修改日期。
但是这个日期是不可靠的。如果重新 clone 一份代码，则所有文件的创建日期都变成了 clone 的时间。

## [hexo-filter-author-from-git]( https://github.com/xcatliu/hexo-filter-author-from-git)

- 获取 post 的第一个提交的 user.name 作为 author
- 获取 post 的所有提交的 user.name ，生成一个数组作为 contributors

### 解决的问题

手动维护一个 contributors 列表太麻烦了。

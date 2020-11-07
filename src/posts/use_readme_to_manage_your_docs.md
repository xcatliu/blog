---
date: 2014-12-09
categories:
  - 编程世界
tags:
  - README
  - Markdown
---

# 基于 README 的文档管理

## 什么是 readme

> A readme (or read me) file contains information about other files in a directory or archive and is very commonly distributed with computer software.

## 为什么要在仓库中写文档

- 文档和代码在一起，方便查看
- 文档和代码版本一致
- 使用 markdown 格式的 README 文档可以在 GitHub 中直接查看
- 可以在 vim 中查看
- README 已经能（并且能更好的）满足大部分需求

## markdown 规则

推荐遵守此规则：

[Markdown 规范][markdown.tw] + [GitHub Flavored Markdown][]

## 应该叫什么名字

建议叫 README.md

而不是 readme.md 或 README.markdown

## 愿景

尽量替代掉「使用 wiki 或 website 管理文档」（或者 website 是通过 readme 文档生成的，do not repeat yourself）

## readme 内容

一个好的 README 需要包含哪些内容？以下是 [stackoverflow 给出的答案][how-to-write-a-good-readme]：

- 此项目的标题和包含的子模块
- 对项目和子模块的描述
- 一个简短的例子告诉读者如何使用
- LICENSE
- 在哪儿可以找到文档
- 怎么安装，配置，运行此程序
- 在哪儿可以找到最新代码
- 作者
- 如何提交 bug，提建议，加入讨论组
- 其他联系方式（email，website）
- 简短的历史介绍
- 法律声明

我推荐包含以下内容：

- 标题
- 描述
- 使用方式
- [ optional ] 链接（npm，website，wiki，git repo）
- [ optional ] 作者（联系方式）
- [ optional ] 测试脚本
- [ optional ] demo 页
- [ optional ] 代码说明，设计模式，维护须知
- [ optional ] 更新历史
- [ optional ] Troubleshooting
- [ optional ] Todo

## Links

- [how-to-write-a-good-readme]
- [Markdown 规范][markdown.tw]
- [GitHub Flavored Markdown][]
- [维基百科 README](http://en.wikipedia.org/wiki/README)
- [Apache HTTP Server README](http://svn.apache.org/repos/asf/httpd/httpd/trunk/README)
- [README 童话故事](https://gist.github.com/eed3si9n/3920236)

[how-to-write-a-good-readme]: http://stackoverflow.com/questions/2304863/how-to-write-a-good-readme
[markdown.tw]: http://markdown.tw/
[GitHub Flavored Markdown]: https://help.github.com/articles/github-flavored-markdown/

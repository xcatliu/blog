---
categories:
  - 编程世界
tags:
  - YUI
  - JavaScript
  - 翻译
---

# 关于 YUI 的重要公告

> 原文：[Important Announcement Regarding YUI](http://yahooeng.tumblr.com/post/96098168666/important-announcement-regarding-yui)

译者按：YUI 伴随着我两年有余，我见证了它的伟大与落魄。它开创了模块加载，发扬了命名空间。它有强大的事件和控件机制，也有臃肿的条件加载和皮肤。它的精髓有如一座图书馆，让你不由得感慨设计之宏大，它的 features 有如一个工具箱，翻箱倒柜一定可以找到合适的工具。然而，时代的巨浪袭来，船大难以掉头，最终被淹没。值得我们反思。本人翻译经验不多，难免有纰漏之处，望指正，另外原文也值得一读。

正文：

2005 年，雅虎创造了 YUI（[Yahoo User Interface library](http://yuilibrary.com/)），2006 年 2 月 13 日，[雅虎开源了 YUI](http://www.yuiblog.com/blog/2006/02/13/the-yahoo-user-interface-library/)。尽管从那时起 YUI 发生了巨大的演变，但它的宗旨始终都是为 web 富应用的开发提供包罗万象的工具。一直以来，YUI 都是雅虎的重要部分，无数行基于 YUI 的代码到现在仍运行在雅虎的网站上。然而我们很清楚，web 技术正在朝着一个新的方向发展。

众所周知，web 技术在过去几年经历了巨大的转型。JavaScript 已经越来越流行。Node.JS 的出现使得 JavaScript 得以在服务器端运行，为创造前后端统一的单页应用开启了一座大门。新的包管理工具（npm，bower）激发了第三方开发者，构建了完整的生态系统，推动了开源、单一目标、拥抱 UNIX 哲学的模块开发，促进了复杂用例的发展。新的构建工具（Grunt 和其完整的生态系统、Broccoli、Gulp）使得组装小模块成为大而精密结合的应用变得容易。新的框架（Backbone、React、Ember、Polymer、Angular 等）使得构建可伸缩可复用的 web 应用成为可能。新的测试工具（Mocha、Casper、Karma 等）降低了构建持续测试体系的成本。与此同时，国际标准（W3C、Ecma）一直在制定大型 JavaScript 框架的规范，浏览器厂商也在致力于实现上述规范。借助于「自升级浏览器」（使用户可以一直保持最新版本的浏览器），未来各浏览器的差异应该会越来越小。

Web 技术的演变使得大型 JavaScript 库（就像 YUI）在社区中的关注度越来越小。如今很多开发者认为大型 JavaScript 库就像一个围墙的花园，他们不想被困在里面。因此，YUI 在过去几年收到的 issues 和 pull requests 已经越来越少了。很多 YUI 核心模块失去了维护者，只能依赖其他开发者的修修补补。代码 review 人员也没有精力去尽快尽责 review 那些修补代码。

因此，**我们做了一个艰难的决定，立即停止 YUI 新功能的开发**，也是为了能够集中精力转型到新的技术。换句话说，将来 YUI 的新版本发布将会越来越少，也越来越慢，并且只会包含针对性的修复和对雅虎网站造成严重影响的问题修复。

YUI 团队的使命是继续不忘初心的创造下一代界面展现技术。我们对界面展现技术的未来充满乐观。我们渴望继续与其他前端社区共同学习和分享。

Julien Lecomte, Director of Engineering, Yahoo Presentation Technologies

---
date: 2013-11-08
categories:
  - 编程世界
tags:
  - Grunt
  - JavaScript
---

# Grunt Getting Started

## Grunt 简介

每个前端开发工程师都会遇到前端文件校验、打包、压缩的问题。使用 Grunt 之前，你可能也使用过 Shell 脚本或者 Ant 脚本，来实现校验合并压缩等任务。

Grunt 是一个基于任务的 JavaScript 项目命令行构建工具，运行于 Node.js 平台。 Grunt 能够从模板快速创建项目，合并、压缩和校验 CSS&JS 文件，运行单元测试以及启动静态服务器。

### grunt 是如何工作的？

刚刚接触 grunt ，举个例子可能不太恰当，但应该可以让你先比较准确的认识它。

就好像一个万能工厂（grunt），只负责执行任务（Task），不关心每个任务到底都干了什么。 这些任务比如：

- clean:删除临时文件
- uglify:压缩
- qunit:测试
- concat:合并

任务流程可能是这样的：

- task:clean
- task:uglify
- task:qunit
- task:concat

### Why use a task runner?

> In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort.

### Why use Grunt?

> The Grunt ecosystem is huge and it's growing every day. With literally hundreds of plugins to choose from, you can use Grunt to automate just about anything with a minimum of effort. If someone hasn't already built what you need, authoring and publishing your own Grunt plugin to npm is a breeze.

## 安装

安装 Grunt 之前得安装 nodejs 和 npm 。（以下步骤默认已经安装了 nodejs 和 npm ）

### 安装 grunt CLI

```shell
npm install -g grunt-cli
```

### 在项目中使用 grunt

使用 grunt 之前，需要在项目根目录下创建文件 `package.json`，`package.json` 是用来存放 npm 的项目配置，与 grunt 关系最大的配置在 `devDependencies` 中。一个最基础的 `package.json` 如下：

```json
{
  "name": "my-project-name",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.1",
    "grunt-contrib-uglify": "~0.2.2"
  }
}
```

### 安装 grunt

进入项目所在目录，运行：

```shell
npm install
```

npm 会根据 `package.json` 中的配置，将需要的 grunt 及其插件下载到你的项目目录中。

当需要下载一个新的 grunt plugins 时，执行如下命令，会同步更新 `package.json` 中的 `devDependencies`。

```shell
npm install grunt-cmd-concat --save-dev    #  --save-dev: Package will appear in your devDependencies.
```

### 简单例子

grunt 的任务都是在 `Gruntfile.js` 中定义的，`Gruntfile.js` 在项目根目录下，注意 `G` 得要大写，一个简单的 `Gruntfile.js` 如下：

```js
module.exports = function(grunt) {    //Gruntfile基本框架

  // Project configuration.
  grunt.initConfig({    //大多数Grunt任务需要依赖传入initConfig中的对象
    pkg: grunt.file.readJSON('package.json'),    //以JSON格式读取package.json文件，后面用到了pkg.name
    uglify: {    //uglify任务
      options: {    //uglify任务的特殊的选项
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'    //文件头部添加一行注释
      },
      build: {
        src: 'helloworld.js',    //源文件
        dest: 'helloworld.min.js'    //目标文件
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
```

这个 Gruntfile 定义了 uglify 任务，可以在命令行中运行：

```shell
grunt    #默认执行default任务
```

或者

```shell
grunt uglify    #执行uglify任务，将helloworld.js文件压缩到helloworld.min.js文件
```

可以看到，新生成的 `helloworld.min.js` 文件是被压缩过的。

## Links

- http://gruntjs.com/getting-started
- [Grunt -- 最好的前端构建框架](http://lostjs.com/2012/12/08/grunt-the-best/)
- [关于Grunt，从一个简单的配置开始！](http://docs.spmjs.org/contrib/simple-grunt)
- [Grunt官网](http://gruntjs.com/)
- [Node环境搭建及对应的包管理](http://wiki.sankuai.com/pages/viewpage.action?pageId=70704478)
- [Grunt中文帮助](http://www.gruntjs.org/article/getting_started.html)

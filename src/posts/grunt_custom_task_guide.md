---
date: 2013-12-04
categories:
  - 编程世界
tags:
  - Grunt
  - JavaScript
---

# Grunt Custom Task 指南

阅读这篇之前，请了解 grunt ，可以参考 [Grunt Getting Starting]。

在决定创建自己的 task 之前，最好搜索一下你的需求是不是已经有别人写好的了：http://gruntjs.com/plugins。

## 简介

grunt 有一套强大的创建任务机制，不管是 grunt 官方任务（如 grunt-contrib-uglify ）还是 npm 上其他人提供的 grunt 任务（如 grunt-mocha ）亦或是你自己创建的任务（如 mod_revision ），都是使用同一套机制。故阅读 grunt 官方任务源码，有助于我们创建自己的任务。

grunt 基于 node 开发，node 能做到的，在 grunt task 中都可以做到。

一般来说，一个任务分三部分： `register task`，`load task`，`task config`。

## 选择 task 的类型

在创建自己的任务之前要明确，这个任务是单任务类型，还是多任务类型。

### 单任务类型

单任务适用于只有一个单一的使用场景，如 watch 只需要监听配置中指定的文件。

#### Alias task

```js
grunt.task.registerTask(taskName, taskList);
```

依次运行 `taskList` 中的任务，本文不做重点介绍。

#### Function task

```js
grunt.task.registerTask(taskName, description, taskFunction);
```

运行 `taskFunction` 中的内容

### 多任务类型

多任务适用于多种不同的使用场景，如在不同的环境中，`jshint` 的配置可以不一样。

```js
grunt.task.registerMultiTask(taskName, description, taskFunction);
```

不同于单任务类型，`taskFunction` 中 `this` 会有一个 `target` 属性标识当前运行的哪一个 `target` ， `config` 中也比单任务多一个 `target` 层级。

```js
grunt.initConfig({
  // watch 是一个单任务
  // 直接运行 grunt watch
  watch: {
    files: ['**/*'],
    tasks: ['jshint'],
  },
  // concat 是一个多任务
  // 运行 grunt concat:dist 与 grunt concat:dev 得到不同的结果
  // dist 和 dev 是两个 target
  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
      dest: 'dist/built.js',
    },
    dev: {
      src: [...],
      dest: '...',
    }
  }
});
```

## 向 task 传参

多数情况下， custom task 中会需要使用参数。

`taskFunction` 有多种方式接收参数，应根据不同的需求使用不同的方式。

### 在 config 中配置

grunt 可以通过 `this.options` 获取在 `config` 中设置的参数。

```js
grunt.initConfig({
  custom_task: {
    // task-level options
    options: {
      comments: '/* 自动生成，无需修改 */'
    },
    dist: {
      // target-level options
      options: {
        comments: '/* 通过 dist target 生成 */'
      }
      src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
      dest: 'dist/built.js',
    },
    dev: {
      src: [...],
      dest: '...',
    }
  }
});
 
grunt.task.registerMutliTask('custom_task', 'A custom task', function () {
  var options = this.options({
    comments: '/* config 没有配置 */',
    words: 'hello world'
  });
  grunt.log.write(options.comments);
  grunt.log.write(options.words);
});
 
// grunt custom_task:dist
// /* 通过 dist target 生成 */
// hello world
// grunt custom_task:dev
// /* config 没有配置 */
// hello world
```

优先级 `target-level options` > `task-level options` > `defaultsObj argument`。

注意：单任务由于没有 `target` 故只包含两个层级。

### 运行时通过 arguments 传参

grunt 命令中空格用来分隔多个 tasks。

```shell
grunt jshint:dist uglify:dist concat:dist
# 相当于
grunt jshint:dist
grunt uglify:dist
grunt concat:dist
 
# 若想在 custom task 中接受命令行中的参数， grunt 提供了以冒号分隔 arguments 的机制
grunt custom_single_task:arg1:arg2
grunt custom_mutli_task:target:arg1:arg2
```

参考如下例子：

```js
grunt.task.registerMutliTask('custom_single_task', 'A custom single task', function (arg1, arg2) {
  grunt.log.write(arg1, arg2);
});
// 也可以通过 arguments 访问到
grunt.task.registerMutliTask('custom_task', 'A custom task', function () {
  grunt.log.write(arguments[1], arguments[2]);
});
```

### 运行时通过 option 传参

另一种传参机制是通过形如 `--env=dist` 的形式，使得多个任务可以共用一个参数。

```shell
grunt custom_task1 costom_task2 costom_task3:target --env=dist
```

在 `taskFunction` 中可以通过 `grunt.opton(key[, val])` 获得这种参数：

```js
grunt.task.registerTask('custom_task', 'A custom task', function () {
  var env = grunt.option('env');
  grunt.option('stack', true);
  grunt.log.write(env);
});
```

若使用的是 `--env` 则 `env` 的值为 `true`。

需要注意的是，不要和其他 grunt 自带的参数使用混淆了，它们包括：

- --help, -h
- --base
- --no-color
- --gruntfile
- --debug, -d
- --stack
- --force, -f
- --tasks
- --npm
- --no-write
- --verbose, -v
- --version, -V
- --completion

## 异步机制

对于一个异步任务，需要使用 `this.async` 方法声明它是异步的，然后在执行完成时调用 `this.async()()`，举例如下：

```js
// Tell Grunt this task is asynchronous.
var done = this.async();
// Your async code.
setTimeout(function() {
  // Let's simulate an error, sometimes.
  var success = Math.random() > 0.5;
  // All done!
  done(success);
}, 1000);
```

注意，如果有多个出口，需要在每个出口都调用 `done()`。

---
date: 2013-09-27
categories:
  - 编程世界
tags:
  - Grunt
  - JavaScript
  - 分享
---

# Grunt

## Grunt API

### grunt.registerTask

alias for `grunt.task.registerTask`

### Alias Task

```js
// http://gruntjs.com/api/grunt.task#grunt.task.registertask
grunt.registerTask(taskName, taskList);
grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
grunt.registerTask('dist', ['concat:dist', 'uglify:dist']); // 可以写任务描述
grunt.registerTask('default', 'default task description', 'build'); // 可以定义带冒号的任务
grunt.registerTask('build:dist', ['concat:dist', 'uglify:dist']);
```

### Function Task

```js
// http://gruntjs.com/api/grunt.task#grunt.task.registertask
grunt.task.registerTask(taskName, description, taskFunction);
grunt.task.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
  if (arguments.length === 0) {
    grunt.log.writeln(this.name + ", no args");
  } else {
    grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
  }
});
// grunt foo:testing:123
// foo, testing 123
```

### grunt.registerMultiTask

alias for `grunt.task.registerMultiTask`

> When a multi task is run, Grunt looks for a property of the same name in the Grunt configuration. Multi-tasks can have multiple configurations, defined using arbitrarily named "targets."

```js
// http://gruntjs.com/creating-tasks#multi-tasks
grunt.registerMultiTask(taskName, [description, ] taskFunction);
grunt.initConfig({ log: { foo: [1, 2, 3], bar: 'hello world', baz: false } });
grunt.registerMultiTask('log', 'Log stuff.', function() {
  grunt.log.writeln(this.target + ': ' + this.data); });
  // grunt log:foo
  // foo: 1,2,3
  // grunt log:bar
  // bar: hello world
  // grunt log
  // foo: 1,2,3
  // bar: hello world
  // baz: false
```

### grunt.config

```js
grunt.config([prop [, value]])
grunt.config.get([prop])
grunt.config.set(prop, value)
```

### grunt.file

```js
grunt.file.read(filepath [, options])
grunt.file.readJSON(filepath [, options])
grunt.file.readYAML(filepath [, options])
grunt.file.write(filepath, contents [, options])
```

### grunt.option

> The Grunt option API is for sharing parameters across multiple tasks and accessing parameters set on the command line.
> An example would be a flag to target whether your build is for development or staging. On the command line: grunt deploy --target=staging would cause grunt.option('target') to return "staging".

```js
grunt.option(key[, val])
```

### this.options

> Returns an options object. Properties of the optional defaultsObj argument will be overridden by any task-level options object properties, which will be further overridden in multi tasks by any target-level options object properties.

```js
this.options([defaultsObj])
```

### this.files

> In a multi task, all files specified using any Grunt-supported file formats and options, globbing patterns or dynamic mappings will automatically be normalized into a single format: the Files Array file format.
> What this means is that tasks don't need to contain a ton of boilerplate for explicitly handling custom file formats, globbing patterns, mapping source files to destination files or filtering out files or directories. A task user can just specify files per the Configuring tasks guide, and Grunt will handle all the details.

```js
this.files.forEach(function(file) {
  var contents = file.src.filter(function(filepath) {
    // Remove nonexistent files (it's up to you to filter or warn here).
    if (!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  }).map(function(filepath) {
    // Read and return the file's source.
    return grunt.file.read(filepath);
  }).join('\n');
  // Write joined contents to destination filepath.
  grunt.file.write(file.dest, contents);
  // Print a success message.
  grunt.log.writeln('File "' + file.dest + '" created.');
});
```

## 最佳实践

- 解耦
- 灵活运用 `grunt.option`, `this.options`, `this.target`
- 参考 grunt 官方任务 `contrib-*`

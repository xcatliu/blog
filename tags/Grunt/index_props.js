import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "tags/Grunt/",
    'layoutPath': "archives/_layout.tsx",
    'outputPath': "tags/Grunt/index.html",
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'title': "Grunt",
    'content': null,
    'blog': {
        "isPost": false,
        "posts": [
            {
                "pagePath": "posts/grunt_custom_task_guide.md",
                "title": "Grunt Custom Task 指南",
                "link": "posts/grunt_custom_task_guide.html",
                "date": "2013-12-04T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Grunt",
                    "JavaScript"
                ],
                "excerpt": "阅读这篇之前，请了解 grunt ，可以参考 [Grunt Getting Starting]。 在决定创建自己的 task 之前，最好搜索一下你的需求是不是已经有别人写好的了：http://gruntjs.com/plugins。 简介 grunt 有一套强大的创建任务机制，不管是..."
            },
            {
                "pagePath": "posts/grunt_getting_started.md",
                "title": "Grunt Getting Started",
                "link": "posts/grunt_getting_started.html",
                "date": "2013-11-08T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Grunt",
                    "JavaScript"
                ],
                "excerpt": "Grunt 简介 每个前端开发工程师都会遇到前端文件校验、打包、压缩的问题。使用 Grunt 之前，你可能也使用过 Shell 脚本或者 Ant 脚本，来实现校验合并压缩等任务。 Grunt 是一个基于任务的 JavaScript 项目命令行构建工具，运行..."
            },
            {
                "pagePath": "posts/grunt.md",
                "title": "Grunt",
                "link": "posts/grunt.html",
                "date": "2013-09-27T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Grunt",
                    "JavaScript",
                    "分享"
                ],
                "excerpt": "Grunt API grunt.registerTask alias for grunt.task.registerTask Alias Task // http://gruntjs.com/api/grunt.task#grunt.task.registertask grunt.registerTask(taskName, taskList); grunt.registerTask('default', ['jsh..."
            }
        ],
        "tags": [
            {
                "name": "JavaScript",
                "count": 16
            },
            {
                "name": "总结思考",
                "count": 9
            },
            {
                "name": "分享",
                "count": 6
            },
            {
                "name": "Mobi.css",
                "count": 4
            },
            {
                "name": "CSS",
                "count": 3
            },
            {
                "name": "Grunt",
                "count": 3
            },
            {
                "name": "Hexo",
                "count": 3
            },
            {
                "name": "Markdown",
                "count": 3
            },
            {
                "name": "Fetch",
                "count": 2
            },
            {
                "name": "GitHub",
                "count": 2
            },
            {
                "name": "mazimd",
                "count": 2
            },
            {
                "name": "React",
                "count": 2
            },
            {
                "name": "React Native",
                "count": 2
            },
            {
                "name": "TypeScript",
                "count": 2
            },
            {
                "name": "V2HOT",
                "count": 2
            },
            {
                "name": "Windows",
                "count": 2
            },
            {
                "name": "微软",
                "count": 2
            },
            {
                "name": "测试",
                "count": 2
            },
            {
                "name": "翻译",
                "count": 2
            },
            {
                "name": "Android",
                "count": 1
            },
            {
                "name": "Array",
                "count": 1
            },
            {
                "name": "AST",
                "count": 1
            },
            {
                "name": "Bootstrap",
                "count": 1
            },
            {
                "name": "Canvas",
                "count": 1
            },
            {
                "name": "Debug",
                "count": 1
            },
            {
                "name": "ESLint",
                "count": 1
            },
            {
                "name": "Flico",
                "count": 1
            },
            {
                "name": "GeoJSON",
                "count": 1
            },
            {
                "name": "Git",
                "count": 1
            },
            {
                "name": "Git Hooks",
                "count": 1
            },
            {
                "name": "Google Analytics",
                "count": 1
            },
            {
                "name": "Hybrid App",
                "count": 1
            },
            {
                "name": "Hyper-V",
                "count": 1
            },
            {
                "name": "JSON",
                "count": 1
            },
            {
                "name": "Linux",
                "count": 1
            },
            {
                "name": "npm",
                "count": 1
            },
            {
                "name": "On call",
                "count": 1
            },
            {
                "name": "Pagic",
                "count": 1
            },
            {
                "name": "Puppeteer",
                "count": 1
            },
            {
                "name": "README",
                "count": 1
            },
            {
                "name": "Samba",
                "count": 1
            },
            {
                "name": "TopoJSON",
                "count": 1
            },
            {
                "name": "Tutorial",
                "count": 1
            },
            {
                "name": "UglifyJS",
                "count": 1
            },
            {
                "name": "VituralBox",
                "count": 1
            },
            {
                "name": "WebViewJavascriptBridge",
                "count": 1
            },
            {
                "name": "Wiki",
                "count": 1
            },
            {
                "name": "YUI",
                "count": 1
            },
            {
                "name": "代码复杂度",
                "count": 1
            },
            {
                "name": "代码质量",
                "count": 1
            },
            {
                "name": "校招",
                "count": 1
            },
            {
                "name": "模块化",
                "count": 1
            },
            {
                "name": "测试覆盖率",
                "count": 1
            },
            {
                "name": "生日快乐",
                "count": 1
            },
            {
                "name": "计划",
                "count": 1
            },
            {
                "name": "设计模式",
                "count": 1
            },
            {
                "name": "语义化",
                "count": 1
            },
            {
                "name": "键盘",
                "count": 1
            },
            {
                "name": "高级工程师",
                "count": 1
            }
        ],
        "categories": [
            {
                "name": "编程世界",
                "count": 48
            },
            {
                "name": "多彩生活",
                "count": 7
            }
        ]
    }
};

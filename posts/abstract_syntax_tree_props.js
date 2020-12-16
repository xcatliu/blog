import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "posts/abstract_syntax_tree.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/abstract_syntax_tree.html",
    'title': "抽象语法树在 JavaScript 中的应用",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>抽象语法树在 JavaScript 中的应用</h1>\n<blockquote>\n<p>发表在美团技术博客上：<a href="http://tech.meituan.com/abstract-syntax-tree.html">http://tech.meituan.com/abstract-syntax-tree.html</a></p>\n</blockquote>\n<h2 id="%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88">抽象语法树是什么<a class="anchor" href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88">§</a></h2>\n<blockquote>\n<p>在计算机科学中，抽象语法树（Abstract syntax tree 或者缩写为 AST），或者语法树（Syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。树上的每个节点都表示源代码中的一种结构。之所以说语法是「抽象」的，是因为这里的语法并不会表示出真实语法中出现的每个细节。<sup><a href="http://en.wikipedia.org/wiki/Abstract_syntax_tree">1</a></sup></p>\n</blockquote>\n<p>果然比较抽象，不如先看几个例子：</p>\n<h2 id="%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E4%B8%BE%E4%BE%8B">抽象语法树举例<a class="anchor" href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E4%B8%BE%E4%BE%8B">§</a></h2>\n<pre class="language-js"><code class="language-js">foo <span class="token operator">=</span> <span class="token string">\'hello world\'</span><span class="token punctuation">;</span>\n<span class="token comment">/*\n    +-------------+             \n    |  assign(=)  |             \n    +-------------+             \n       X        X               \n      X          X              \n+-------+    +-----------------+\n|  foo  |    |  \'hello world\'  |\n+-------+    +-----------------+\n*/</span>\n<span class="token keyword control-flow">if</span> <span class="token punctuation">(</span>foo <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  bar <span class="token operator">=</span> <span class="token string">\'hello world\'</span><span class="token punctuation">;</span>\n  <span class="token function">alert</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token comment">/*\n                       +------+                                    \n                       |  if  |                                    \n                       +------+                                    \n                        X    X                                     \n                      X        X                                   \n         +--------------+    +-------------+                       \n         |  equal(===)  |    |  if_body    |                       \n         +--------------+    +-------------+                       \n         X        X              X         X                       \n       X         X                X          X                     \n+-------+   +--------+    +-------------+   +------------+         \n|  foo  |   |  true  |    |  assign(=)  |   |  alert()   |         \n+-------+   +--------+    +-------------+   +------------+         \n                             X        X                  X         \n                           X            X                  X       \n                       +-------+   +-----------------+    +-------+\n                       |  bar  |   |  \'hello world\'  |    |  bar  |\n                       +-------+   +-----------------+    +-------+\n*/</span>\n</code></pre>\n<p>从上述两个例子可以看出，抽象语法树是将源代码根据其语法结构，省略一些细节（比如：括号没有生成节点），抽象成树形表达。</p>\n<p>抽象语法树在计算机科学中有很多应用，比如编译器、IDE、压缩优化代码等。下面介绍一下抽象语法树在 JavaScript 中的应用。</p>\n<h2 id="javascript-%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">JavaScript 抽象语法树<a class="anchor" href="#javascript-%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">§</a></h2>\n<p>构造 JavaScript 抽象语法树有多种工具，比如 <a href="https://github.com/v8/v8/blob/master/src/ast/ast.h">V8</a>、<a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API">SpiderMonkey</a>、<a href="http://lisperator.net/uglifyjs/">UglifyJS</a> 等，这里重点介绍 UglifyJS。</p>\n<h3 id="uglifyjs">UglifyJS<a class="anchor" href="#uglifyjs">§</a></h3>\n<p>UglifyJS<sup><a href="http://lisperator.net/uglifyjs/">2</a></sup> 是使用最广的 JavaScript 压缩工具之一，而且自身也是用 JavaScript 写的，使用它的方法很简单（需要 <a href="http://nodejs.org/">Node.js</a> 环境）：</p>\n<p>首先全局安装：</p>\n<pre class="language-shell"><code class="language-shell"><span class="token punctuation">[</span>sudo <span class="token punctuation">]</span>npm <span class="token function">install</span> -g uglify-js\n</code></pre>\n<p>然后就可以使用了：</p>\n<pre class="language-shell"><code class="language-shell">uglifyjs -m srcFileName.js -o destFileName.min.js\n</code></pre>\n<p>关于 UglifyJS 的用法这里就不多介绍了，我们要做的是一些更有趣的事情。</p>\n<h3 id="uglifyjs-tools">UglifyJS Tools<a class="anchor" href="#uglifyjs-tools">§</a></h3>\n<p>UglifyJS 提供了一些工具用于分析 JavaScript 代码，包括：</p>\n<ul>\n<li>parser，把 JavaScript 代码解析成抽象语法树</li>\n<li>code generator，通过抽象语法树生成代码</li>\n<li>mangler，混淆 JavaScript 代码</li>\n<li>scope analyzer，分析变量定义的工具</li>\n<li>tree walker，遍历树节点</li>\n<li>tree transformer，改变树节点</li>\n</ul>\n<h3 id="%E7%94%9F%E6%88%90%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">生成抽象语法树<a class="anchor" href="#%E7%94%9F%E6%88%90%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">§</a></h3>\n<p>使用 UglifyJS 生成抽象语法树很简单：</p>\n<p>首先安装 UglifyJS 为 npm 包：</p>\n<pre class="language-shell"><code class="language-shell"><span class="token function">npm</span> <span class="token function">install</span> uglify-js --save-dev\n</code></pre>\n<p>然后使用 parse 方法即可：</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token maybe-class-name">UglifyJS</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'uglify-js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> ast <span class="token operator">=</span> <span class="token maybe-class-name">UglifyJS</span><span class="token punctuation">.</span><span class="token method function property-access">parse</span><span class="token punctuation">(</span><span class="token string">\'function sum(foo, bar){ return foo + bar; }\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>这样生成的 ast 即为那一段代码的抽象语法树。那么我们怎么使用呢？</p>\n<h3 id="%E4%BD%BF%E7%94%A8-mangler-%E5%8E%8B%E7%BC%A9%E4%BB%A3%E7%A0%81">使用 mangler 压缩代码<a class="anchor" href="#%E4%BD%BF%E7%94%A8-mangler-%E5%8E%8B%E7%BC%A9%E4%BB%A3%E7%A0%81">§</a></h3>\n<p>使用 mangler 可以通过将局部变量都缩短成一个字符来压缩代码。</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token maybe-class-name">UglifyJS</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'uglify-js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> ast <span class="token operator">=</span> <span class="token maybe-class-name">UglifyJS</span><span class="token punctuation">.</span><span class="token method function property-access">parse</span><span class="token punctuation">(</span><span class="token string">\'function sum(foo, bar){ return foo + bar; }\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nast<span class="token punctuation">.</span><span class="token method function property-access">figure_out_scope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nast<span class="token punctuation">.</span><span class="token method function property-access">mangle_names</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>ast<span class="token punctuation">.</span><span class="token method function property-access">print_to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// function sum(a,b){return a+b}</span>\n</code></pre>\n<h3 id="%E4%BD%BF%E7%94%A8-walker-%E9%81%8D%E5%8E%86%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">使用 walker 遍历抽象语法树<a class="anchor" href="#%E4%BD%BF%E7%94%A8-walker-%E9%81%8D%E5%8E%86%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">§</a></h3>\n<p>使用 walker 可以遍历抽象语法树，这种遍历是深度遍历。</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token maybe-class-name">UglifyJS</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'uglify-js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> ast <span class="token operator">=</span> <span class="token maybe-class-name">UglifyJS</span><span class="token punctuation">.</span><span class="token method function property-access">parse</span><span class="token punctuation">(</span><span class="token string">\'function sum(foo, bar){ return foo + bar; }\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nast<span class="token punctuation">.</span><span class="token method function property-access">figure_out_scope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nast<span class="token punctuation">.</span><span class="token method function property-access">walk</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">UglifyJS<span class="token punctuation">.</span>TreeWalker</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span><span class="token method function property-access">print_to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">/*\nfunction sum(foo,bar){return foo+bar}\nfunction sum(foo,bar){return foo+bar}\nsum\nfoo\nbar\nreturn foo+bar\nfoo+bar\nfoo\nbar\n*/</span>\n</code></pre>\n<p>UglifyJS 已经提供了直接压缩代码的脚本，walker 看上去貌似也没啥用，那么这些工具有什么使用场景呢？</p>\n<h2 id="%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E7%9A%84%E5%BA%94%E7%94%A8">抽象语法树的应用<a class="anchor" href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E7%9A%84%E5%BA%94%E7%94%A8">§</a></h2>\n<h3 id="%E5%88%A9%E7%94%A8%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E9%87%8D%E6%9E%84-javascript-%E4%BB%A3%E7%A0%81">利用抽象语法树重构 JavaScript 代码<a class="anchor" href="#%E5%88%A9%E7%94%A8%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E9%87%8D%E6%9E%84-javascript-%E4%BB%A3%E7%A0%81">§</a></h3>\n<p>假如我们有重构 JavaScript 的需求，它们就派上用场啦。</p>\n<p>下面考虑这样一个需求：</p>\n<p>我们知道，<code>parseInt</code> 用于将字符串变成整数，但是它有第二个参数，表示以几进制识别字符串，若没有传第二个参数，则会自行判断，比如：</p>\n<pre class="language-js"><code class="language-js"><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'10.23\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 10            转换成正整数</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'10abc\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 10            忽略其他字符</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'10\'</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 10            转换成十进制</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'10\'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 2             转换成二进制</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'0123\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 83 or 123     不同浏览器不一样，低版本浏览器会转换成八进制</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'0x11\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 17            转换成十六进制</span>\n</code></pre>\n<p>因为有一些情况是和我们预期不同的，所以建议任何时候都加上第二个参数。</p>\n<p>下面希望有一个脚本，查看所有 <code>parseInt</code> 有没有第二个参数，没有的话加上第二个参数 10，表示以十进制识别字符串。</p>\n<p>使用 UglifyJS 可以实现此功能：</p>\n<pre class="language-js"><code class="language-js">#<span class="token operator">!</span> <span class="token operator">/</span>usr<span class="token operator">/</span>bin<span class="token operator">/</span>env node\n\n<span class="token keyword">var</span> <span class="token constant">U2</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"uglify-js"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">replace_parseint</span><span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> ast <span class="token operator">=</span> <span class="token constant">U2</span><span class="token punctuation">.</span><span class="token method function property-access">parse</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// accumulate `parseInt()` nodes in this array</span>\n    <span class="token keyword">var</span> parseint_nodes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    ast<span class="token punctuation">.</span><span class="token method function property-access">walk</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">U2<span class="token punctuation">.</span>TreeWalker</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span>node <span class="token keyword">instanceof</span> <span class="token class-name">U2<span class="token punctuation">.</span>AST_Call</span>\n            <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span><span class="token property-access">expression</span><span class="token punctuation">.</span><span class="token method function property-access">print_to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">\'parseInt\'</span>\n            <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span><span class="token property-access">args</span><span class="token punctuation">.</span><span class="token property-access">length</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            parseint_nodes<span class="token punctuation">.</span><span class="token method function property-access">push</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// now go through the nodes backwards and replace code</span>\n    <span class="token keyword control-flow">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> parseint_nodes<span class="token punctuation">.</span><span class="token property-access">length</span><span class="token punctuation">;</span> <span class="token operator">--</span>i <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">var</span> node <span class="token operator">=</span> parseint_nodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token keyword">var</span> start_pos <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token property-access">start</span><span class="token punctuation">.</span><span class="token property-access">pos</span><span class="token punctuation">;</span>\n        <span class="token keyword">var</span> end_pos <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token property-access">end</span><span class="token punctuation">.</span><span class="token property-access">endpos</span><span class="token punctuation">;</span>\n        node<span class="token punctuation">.</span><span class="token property-access">args</span><span class="token punctuation">.</span><span class="token method function property-access">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">U2<span class="token punctuation">.</span>AST_Number</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            value<span class="token operator">:</span> <span class="token number">10</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">var</span> replacement <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token method function property-access">print_to_string</span><span class="token punctuation">(</span><span class="token punctuation">{</span> beautify<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        code <span class="token operator">=</span> <span class="token function">splice_string</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> start_pos<span class="token punctuation">,</span> end_pos<span class="token punctuation">,</span> replacement<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword control-flow">return</span> code<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">splice_string</span><span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> begin<span class="token punctuation">,</span> end<span class="token punctuation">,</span> replacement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> str<span class="token punctuation">.</span><span class="token method function property-access">substr</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> begin<span class="token punctuation">)</span> <span class="token operator">+</span> replacement <span class="token operator">+</span> str<span class="token punctuation">.</span><span class="token method function property-access">substr</span><span class="token punctuation">(</span>end<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// test it</span>\n\n<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'12342\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'0012\'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token function">replace_parseint</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span><span class="token method function property-access">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">/*\nfunction test() {\n    if (foo) {\n      parseInt("12342", 10);\n    }\n    parseInt(\'0012\', 3);\n}\n*/</span>\n</code></pre>\n<p>在这里，使用了 walker 找到 <code>parseInt</code> 调用的地方，然后检查是否有第二个参数，没有的话，记录下来，之后根据每个记录，用新的包含第二个参数的内容替换掉原内容，完成代码的重构。</p>\n<p>也许有人会问，这种简单的情况，用正则匹配也可以方便的替换，干嘛要用抽象语法树呢？</p>\n<p>答案就是，<strong>抽象语法树是通过分析语法实现的，有一些正则无法（或者很难）做到的优势，比如，parseInt() 整个是一个字符串，或者在注释中，此种情况会被正则误判</strong>：</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token string">\'parseInt("12345")\'</span><span class="token punctuation">;</span>\n<span class="token comment">// parseInt("12345");</span>\n</code></pre>\n<h3 id="%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E5%9C%A8%E7%BE%8E%E5%9B%A2%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8">抽象语法树在美团中的应用<a class="anchor" href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E5%9C%A8%E7%BE%8E%E5%9B%A2%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8">§</a></h3>\n<p>在美团前端团队，我们使用 YUI 作为前端底层框架，之前面临的一个实际问题是，模块之间的依赖关系容易出现疏漏。比如：</p>\n<pre class="language-js"><code class="language-js"><span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token method function property-access">add</span><span class="token punctuation">(</span><span class="token string">\'mod1\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method function property-access">one</span><span class="token punctuation">(</span><span class="token string">\'#button1\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">simulate</span><span class="token punctuation">(</span><span class="token string">\'click\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token known-class-name class-name">Array</span><span class="token punctuation">.</span><span class="token method function property-access">each</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method-variable function-variable method function property-access">mod1</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">/**/</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    requires<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">\'node\'</span><span class="token punctuation">,</span>\n        <span class="token string">\'array-extras\'</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token method function property-access">add</span><span class="token punctuation">(</span><span class="token string">\'mod2\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method function property-access">mod1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// Y.io(uri, config);</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    requires<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">\'mod1\'</span><span class="token punctuation">,</span>\n        <span class="token string">\'io\'</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>以上代码定义了两个模块，其中 <code>mod1</code> 模拟点击了一下 <code>id</code> 为 <code>button1</code> 的元素，执行了 <code>Y.Array.each</code>，然后定义了方法 <code>Y.mod1</code>，最后声明了依赖 <code>node</code> 和 <code>array-extras</code>；<code>mod2</code> 执行了 <code>mod1</code> 中定义的方法，而<code>Y.io</code> 被注释了，最后声明了依赖 <code>mod1</code> 和 <code>io</code>。</p>\n<p>此处 <code>mod1</code> 出现了两个常见错误，一个是 <code>simulate</code> 是 <code>Y.Node.prototype</code> 上的方法，容易忘掉声明依赖 <code>node-event-simulate</code><sup><a href="http://yuilibrary.com/yui/docs/api/files/node_js_node-event-simulate.js.html#l1">3</a></sup>，另一个是 <code>Y.Array</code> 上只有部分方法需要依赖 <code>array-extras</code>，故此处多声明了依赖 <code>array-extras</code><sup><a href="http://yuilibrary.com/yui/docs/api/classes/Array.html#method_each">4</a></sup>；<code>mod2</code> 中添加注释后，容易忘记删除原来写的依赖 <code>io</code>。</p>\n<p>故正确的依赖关系应该如下：</p>\n<pre class="language-js"><code class="language-js"><span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token method function property-access">add</span><span class="token punctuation">(</span><span class="token string">\'mod1\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method function property-access">one</span><span class="token punctuation">(</span><span class="token string">\'#button1\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">simulate</span><span class="token punctuation">(</span><span class="token string">\'click\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token known-class-name class-name">Array</span><span class="token punctuation">.</span><span class="token method function property-access">each</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method-variable function-variable method function property-access">mod1</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">/**/</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    requires<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">\'node\'</span><span class="token punctuation">,</span>\n        <span class="token string">\'node-event-simulate\'</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token method function property-access">add</span><span class="token punctuation">(</span><span class="token string">\'mod2\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method function property-access">mod1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// Y.io(uri, config);</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    requires<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">\'mod1\'</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>为了使模块依赖关系的检测自动化，我们创建了模块依赖关系检测工具，它利用抽象语法树，分析出定义了哪些接口，使用了哪些接口，然后查找这些接口应该依赖哪些模块，进而找到模块依赖关系的错误，大致的过程如下：</p>\n<ol>\n<li>找到代码中模块定义（<code>YUI.add</code>）的部分</li>\n<li>分析每个模块内函数定义，变量定义，赋值语句等，找出符合要求（以 <code>Y</code> 开头）的输出接口（如 <code>mod1</code> 中的 <code>Y.mod1</code>）</li>\n<li>生成「接口 - 模块」对应关系</li>\n<li>分析每个模块内函数调用，变量使用等，找出符合要求的输入接口（如 <code>mod2</code> 中的 <code>Y.one</code>，<code>Y.Array.each</code>，<code>Y.mod1</code>）</li>\n<li>通过「接口 - 模块」对应关系，找到此模块应该依赖哪些其他模块</li>\n<li>分析 requires 中是否有错误</li>\n</ol>\n<p>使用此工具，保证每次提交代码时，依赖关系都是正确无误的，它帮助我们实现了模块依赖关系检测的自动化。</p>\n<h2 id="%E6%80%BB%E7%BB%93">总结<a class="anchor" href="#%E6%80%BB%E7%BB%93">§</a></h2>\n<p>抽象语法树在计算机领域中应用广泛，以上仅讨论了抽象语法树在 JavaScript 中的一些应用，期待更多的用法等着大家去尝试和探索。</p>\n<h2 id="reference">Reference<a class="anchor" href="#reference">§</a></h2>\n<ol>\n<li><a href="http://en.wikipedia.org/wiki/Abstract_syntax_tree">Wikipedia AST</a></li>\n<li><a href="http://lisperator.net/uglifyjs/">UglifyJS</a></li>\n<li><a href="http://yuilibrary.com/yui/docs/api/files/node_js_node-event-simulate.js.html#l1">node-event-simulate</a></li>\n<li><a href="http://yuilibrary.com/yui/docs/api/classes/Array.html#method_each">Y.Array.each</a></li>\n</ol>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "\u62BD\u8C61\u8BED\u6CD5\u6811\u5728 JavaScript \u4E2D\u7684\u5E94\u7528"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<blockquote>\n<p>发表在美团技术博客上：<a href="http://tech.meituan.com/abstract-syntax-tree.html">http://tech.meituan.com/abstract-syntax-tree.html</a></p>\n</blockquote>\n<h2 id="%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88">抽象语法树是什么<a class="anchor" href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88">§</a></h2>\n<blockquote>\n<p>在计算机科学中，抽象语法树（Abstract syntax tree 或者缩写为 AST），或者语法树（Syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。树上的每个节点都表示源代码中的一种结构。之所以说语法是「抽象」的，是因为这里的语法并不会表示出真实语法中出现的每个细节。<sup><a href="http://en.wikipedia.org/wiki/Abstract_syntax_tree">1</a></sup></p>\n</blockquote>\n<p>果然比较抽象，不如先看几个例子：</p>\n<h2 id="%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E4%B8%BE%E4%BE%8B">抽象语法树举例<a class="anchor" href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E4%B8%BE%E4%BE%8B">§</a></h2>\n<pre class="language-js"><code class="language-js">foo <span class="token operator">=</span> <span class="token string">\'hello world\'</span><span class="token punctuation">;</span>\n<span class="token comment">/*\n    +-------------+             \n    |  assign(=)  |             \n    +-------------+             \n       X        X               \n      X          X              \n+-------+    +-----------------+\n|  foo  |    |  \'hello world\'  |\n+-------+    +-----------------+\n*/</span>\n<span class="token keyword control-flow">if</span> <span class="token punctuation">(</span>foo <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  bar <span class="token operator">=</span> <span class="token string">\'hello world\'</span><span class="token punctuation">;</span>\n  <span class="token function">alert</span><span class="token punctuation">(</span>bar<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n<span class="token comment">/*\n                       +------+                                    \n                       |  if  |                                    \n                       +------+                                    \n                        X    X                                     \n                      X        X                                   \n         +--------------+    +-------------+                       \n         |  equal(===)  |    |  if_body    |                       \n         +--------------+    +-------------+                       \n         X        X              X         X                       \n       X         X                X          X                     \n+-------+   +--------+    +-------------+   +------------+         \n|  foo  |   |  true  |    |  assign(=)  |   |  alert()   |         \n+-------+   +--------+    +-------------+   +------------+         \n                             X        X                  X         \n                           X            X                  X       \n                       +-------+   +-----------------+    +-------+\n                       |  bar  |   |  \'hello world\'  |    |  bar  |\n                       +-------+   +-----------------+    +-------+\n*/</span>\n</code></pre>\n<p>从上述两个例子可以看出，抽象语法树是将源代码根据其语法结构，省略一些细节（比如：括号没有生成节点），抽象成树形表达。</p>\n<p>抽象语法树在计算机科学中有很多应用，比如编译器、IDE、压缩优化代码等。下面介绍一下抽象语法树在 JavaScript 中的应用。</p>\n<h2 id="javascript-%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">JavaScript 抽象语法树<a class="anchor" href="#javascript-%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">§</a></h2>\n<p>构造 JavaScript 抽象语法树有多种工具，比如 <a href="https://github.com/v8/v8/blob/master/src/ast/ast.h">V8</a>、<a href="https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/Parser_API">SpiderMonkey</a>、<a href="http://lisperator.net/uglifyjs/">UglifyJS</a> 等，这里重点介绍 UglifyJS。</p>\n<h3 id="uglifyjs">UglifyJS<a class="anchor" href="#uglifyjs">§</a></h3>\n<p>UglifyJS<sup><a href="http://lisperator.net/uglifyjs/">2</a></sup> 是使用最广的 JavaScript 压缩工具之一，而且自身也是用 JavaScript 写的，使用它的方法很简单（需要 <a href="http://nodejs.org/">Node.js</a> 环境）：</p>\n<p>首先全局安装：</p>\n<pre class="language-shell"><code class="language-shell"><span class="token punctuation">[</span>sudo <span class="token punctuation">]</span>npm <span class="token function">install</span> -g uglify-js\n</code></pre>\n<p>然后就可以使用了：</p>\n<pre class="language-shell"><code class="language-shell">uglifyjs -m srcFileName.js -o destFileName.min.js\n</code></pre>\n<p>关于 UglifyJS 的用法这里就不多介绍了，我们要做的是一些更有趣的事情。</p>\n<h3 id="uglifyjs-tools">UglifyJS Tools<a class="anchor" href="#uglifyjs-tools">§</a></h3>\n<p>UglifyJS 提供了一些工具用于分析 JavaScript 代码，包括：</p>\n<ul>\n<li>parser，把 JavaScript 代码解析成抽象语法树</li>\n<li>code generator，通过抽象语法树生成代码</li>\n<li>mangler，混淆 JavaScript 代码</li>\n<li>scope analyzer，分析变量定义的工具</li>\n<li>tree walker，遍历树节点</li>\n<li>tree transformer，改变树节点</li>\n</ul>\n<h3 id="%E7%94%9F%E6%88%90%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">生成抽象语法树<a class="anchor" href="#%E7%94%9F%E6%88%90%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">§</a></h3>\n<p>使用 UglifyJS 生成抽象语法树很简单：</p>\n<p>首先安装 UglifyJS 为 npm 包：</p>\n<pre class="language-shell"><code class="language-shell"><span class="token function">npm</span> <span class="token function">install</span> uglify-js --save-dev\n</code></pre>\n<p>然后使用 parse 方法即可：</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token maybe-class-name">UglifyJS</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'uglify-js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token keyword">var</span> ast <span class="token operator">=</span> <span class="token maybe-class-name">UglifyJS</span><span class="token punctuation">.</span><span class="token method function property-access">parse</span><span class="token punctuation">(</span><span class="token string">\'function sum(foo, bar){ return foo + bar; }\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>这样生成的 ast 即为那一段代码的抽象语法树。那么我们怎么使用呢？</p>\n<h3 id="%E4%BD%BF%E7%94%A8-mangler-%E5%8E%8B%E7%BC%A9%E4%BB%A3%E7%A0%81">使用 mangler 压缩代码<a class="anchor" href="#%E4%BD%BF%E7%94%A8-mangler-%E5%8E%8B%E7%BC%A9%E4%BB%A3%E7%A0%81">§</a></h3>\n<p>使用 mangler 可以通过将局部变量都缩短成一个字符来压缩代码。</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token maybe-class-name">UglifyJS</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'uglify-js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> ast <span class="token operator">=</span> <span class="token maybe-class-name">UglifyJS</span><span class="token punctuation">.</span><span class="token method function property-access">parse</span><span class="token punctuation">(</span><span class="token string">\'function sum(foo, bar){ return foo + bar; }\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nast<span class="token punctuation">.</span><span class="token method function property-access">figure_out_scope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nast<span class="token punctuation">.</span><span class="token method function property-access">mangle_names</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>ast<span class="token punctuation">.</span><span class="token method function property-access">print_to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">// function sum(a,b){return a+b}</span>\n</code></pre>\n<h3 id="%E4%BD%BF%E7%94%A8-walker-%E9%81%8D%E5%8E%86%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">使用 walker 遍历抽象语法树<a class="anchor" href="#%E4%BD%BF%E7%94%A8-walker-%E9%81%8D%E5%8E%86%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">§</a></h3>\n<p>使用 walker 可以遍历抽象语法树，这种遍历是深度遍历。</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> <span class="token maybe-class-name">UglifyJS</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'uglify-js\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">var</span> ast <span class="token operator">=</span> <span class="token maybe-class-name">UglifyJS</span><span class="token punctuation">.</span><span class="token method function property-access">parse</span><span class="token punctuation">(</span><span class="token string">\'function sum(foo, bar){ return foo + bar; }\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nast<span class="token punctuation">.</span><span class="token method function property-access">figure_out_scope</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nast<span class="token punctuation">.</span><span class="token method function property-access">walk</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">UglifyJS<span class="token punctuation">.</span>TreeWalker</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span><span class="token method function property-access">print_to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token comment">/*\nfunction sum(foo,bar){return foo+bar}\nfunction sum(foo,bar){return foo+bar}\nsum\nfoo\nbar\nreturn foo+bar\nfoo+bar\nfoo\nbar\n*/</span>\n</code></pre>\n<p>UglifyJS 已经提供了直接压缩代码的脚本，walker 看上去貌似也没啥用，那么这些工具有什么使用场景呢？</p>\n<h2 id="%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E7%9A%84%E5%BA%94%E7%94%A8">抽象语法树的应用<a class="anchor" href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E7%9A%84%E5%BA%94%E7%94%A8">§</a></h2>\n<h3 id="%E5%88%A9%E7%94%A8%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E9%87%8D%E6%9E%84-javascript-%E4%BB%A3%E7%A0%81">利用抽象语法树重构 JavaScript 代码<a class="anchor" href="#%E5%88%A9%E7%94%A8%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E9%87%8D%E6%9E%84-javascript-%E4%BB%A3%E7%A0%81">§</a></h3>\n<p>假如我们有重构 JavaScript 的需求，它们就派上用场啦。</p>\n<p>下面考虑这样一个需求：</p>\n<p>我们知道，<code>parseInt</code> 用于将字符串变成整数，但是它有第二个参数，表示以几进制识别字符串，若没有传第二个参数，则会自行判断，比如：</p>\n<pre class="language-js"><code class="language-js"><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'10.23\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 10            转换成正整数</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'10abc\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 10            忽略其他字符</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'10\'</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    <span class="token comment">// 10            转换成十进制</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'10\'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>     <span class="token comment">// 2             转换成二进制</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'0123\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 83 or 123     不同浏览器不一样，低版本浏览器会转换成八进制</span>\n<span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'0x11\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      <span class="token comment">// 17            转换成十六进制</span>\n</code></pre>\n<p>因为有一些情况是和我们预期不同的，所以建议任何时候都加上第二个参数。</p>\n<p>下面希望有一个脚本，查看所有 <code>parseInt</code> 有没有第二个参数，没有的话加上第二个参数 10，表示以十进制识别字符串。</p>\n<p>使用 UglifyJS 可以实现此功能：</p>\n<pre class="language-js"><code class="language-js">#<span class="token operator">!</span> <span class="token operator">/</span>usr<span class="token operator">/</span>bin<span class="token operator">/</span>env node\n\n<span class="token keyword">var</span> <span class="token constant">U2</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"uglify-js"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">function</span> <span class="token function">replace_parseint</span><span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">var</span> ast <span class="token operator">=</span> <span class="token constant">U2</span><span class="token punctuation">.</span><span class="token method function property-access">parse</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// accumulate `parseInt()` nodes in this array</span>\n    <span class="token keyword">var</span> parseint_nodes <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>\n    ast<span class="token punctuation">.</span><span class="token method function property-access">walk</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">U2<span class="token punctuation">.</span>TreeWalker</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span>node <span class="token keyword">instanceof</span> <span class="token class-name">U2<span class="token punctuation">.</span>AST_Call</span>\n            <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span><span class="token property-access">expression</span><span class="token punctuation">.</span><span class="token method function property-access">print_to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">\'parseInt\'</span>\n            <span class="token operator">&amp;&amp;</span> node<span class="token punctuation">.</span><span class="token property-access">args</span><span class="token punctuation">.</span><span class="token property-access">length</span> <span class="token operator">===</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            parseint_nodes<span class="token punctuation">.</span><span class="token method function property-access">push</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// now go through the nodes backwards and replace code</span>\n    <span class="token keyword control-flow">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> parseint_nodes<span class="token punctuation">.</span><span class="token property-access">length</span><span class="token punctuation">;</span> <span class="token operator">--</span>i <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">var</span> node <span class="token operator">=</span> parseint_nodes<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>\n        <span class="token keyword">var</span> start_pos <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token property-access">start</span><span class="token punctuation">.</span><span class="token property-access">pos</span><span class="token punctuation">;</span>\n        <span class="token keyword">var</span> end_pos <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token property-access">end</span><span class="token punctuation">.</span><span class="token property-access">endpos</span><span class="token punctuation">;</span>\n        node<span class="token punctuation">.</span><span class="token property-access">args</span><span class="token punctuation">.</span><span class="token method function property-access">push</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">U2<span class="token punctuation">.</span>AST_Number</span><span class="token punctuation">(</span><span class="token punctuation">{</span>\n            value<span class="token operator">:</span> <span class="token number">10</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token keyword">var</span> replacement <span class="token operator">=</span> node<span class="token punctuation">.</span><span class="token method function property-access">print_to_string</span><span class="token punctuation">(</span><span class="token punctuation">{</span> beautify<span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n        code <span class="token operator">=</span> <span class="token function">splice_string</span><span class="token punctuation">(</span>code<span class="token punctuation">,</span> start_pos<span class="token punctuation">,</span> end_pos<span class="token punctuation">,</span> replacement<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token keyword control-flow">return</span> code<span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">function</span> <span class="token function">splice_string</span><span class="token punctuation">(</span><span class="token parameter">str<span class="token punctuation">,</span> begin<span class="token punctuation">,</span> end<span class="token punctuation">,</span> replacement</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">return</span> str<span class="token punctuation">.</span><span class="token method function property-access">substr</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> begin<span class="token punctuation">)</span> <span class="token operator">+</span> replacement <span class="token operator">+</span> str<span class="token punctuation">.</span><span class="token method function property-access">substr</span><span class="token punctuation">(</span>end<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token comment">// test it</span>\n\n<span class="token keyword">function</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span>foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'12342\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">\'0012\'</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span>\n\n<span class="token console class-name">console</span><span class="token punctuation">.</span><span class="token method function property-access">log</span><span class="token punctuation">(</span><span class="token function">replace_parseint</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span><span class="token method function property-access">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token comment">/*\nfunction test() {\n    if (foo) {\n      parseInt("12342", 10);\n    }\n    parseInt(\'0012\', 3);\n}\n*/</span>\n</code></pre>\n<p>在这里，使用了 walker 找到 <code>parseInt</code> 调用的地方，然后检查是否有第二个参数，没有的话，记录下来，之后根据每个记录，用新的包含第二个参数的内容替换掉原内容，完成代码的重构。</p>\n<p>也许有人会问，这种简单的情况，用正则匹配也可以方便的替换，干嘛要用抽象语法树呢？</p>\n<p>答案就是，<strong>抽象语法树是通过分析语法实现的，有一些正则无法（或者很难）做到的优势，比如，parseInt() 整个是一个字符串，或者在注释中，此种情况会被正则误判</strong>：</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">var</span> foo <span class="token operator">=</span> <span class="token string">\'parseInt("12345")\'</span><span class="token punctuation">;</span>\n<span class="token comment">// parseInt("12345");</span>\n</code></pre>\n<h3 id="%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E5%9C%A8%E7%BE%8E%E5%9B%A2%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8">抽象语法树在美团中的应用<a class="anchor" href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E5%9C%A8%E7%BE%8E%E5%9B%A2%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8">§</a></h3>\n<p>在美团前端团队，我们使用 YUI 作为前端底层框架，之前面临的一个实际问题是，模块之间的依赖关系容易出现疏漏。比如：</p>\n<pre class="language-js"><code class="language-js"><span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token method function property-access">add</span><span class="token punctuation">(</span><span class="token string">\'mod1\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method function property-access">one</span><span class="token punctuation">(</span><span class="token string">\'#button1\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">simulate</span><span class="token punctuation">(</span><span class="token string">\'click\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token known-class-name class-name">Array</span><span class="token punctuation">.</span><span class="token method function property-access">each</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method-variable function-variable method function property-access">mod1</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">/**/</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    requires<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">\'node\'</span><span class="token punctuation">,</span>\n        <span class="token string">\'array-extras\'</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token method function property-access">add</span><span class="token punctuation">(</span><span class="token string">\'mod2\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method function property-access">mod1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// Y.io(uri, config);</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    requires<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">\'mod1\'</span><span class="token punctuation">,</span>\n        <span class="token string">\'io\'</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>以上代码定义了两个模块，其中 <code>mod1</code> 模拟点击了一下 <code>id</code> 为 <code>button1</code> 的元素，执行了 <code>Y.Array.each</code>，然后定义了方法 <code>Y.mod1</code>，最后声明了依赖 <code>node</code> 和 <code>array-extras</code>；<code>mod2</code> 执行了 <code>mod1</code> 中定义的方法，而<code>Y.io</code> 被注释了，最后声明了依赖 <code>mod1</code> 和 <code>io</code>。</p>\n<p>此处 <code>mod1</code> 出现了两个常见错误，一个是 <code>simulate</code> 是 <code>Y.Node.prototype</code> 上的方法，容易忘掉声明依赖 <code>node-event-simulate</code><sup><a href="http://yuilibrary.com/yui/docs/api/files/node_js_node-event-simulate.js.html#l1">3</a></sup>，另一个是 <code>Y.Array</code> 上只有部分方法需要依赖 <code>array-extras</code>，故此处多声明了依赖 <code>array-extras</code><sup><a href="http://yuilibrary.com/yui/docs/api/classes/Array.html#method_each">4</a></sup>；<code>mod2</code> 中添加注释后，容易忘记删除原来写的依赖 <code>io</code>。</p>\n<p>故正确的依赖关系应该如下：</p>\n<pre class="language-js"><code class="language-js"><span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token method function property-access">add</span><span class="token punctuation">(</span><span class="token string">\'mod1\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method function property-access">one</span><span class="token punctuation">(</span><span class="token string">\'#button1\'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">simulate</span><span class="token punctuation">(</span><span class="token string">\'click\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token known-class-name class-name">Array</span><span class="token punctuation">.</span><span class="token method function property-access">each</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> fn<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method-variable function-variable method function property-access">mod1</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">/**/</span><span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    requires<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">\'node\'</span><span class="token punctuation">,</span>\n        <span class="token string">\'node-event-simulate\'</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token constant">YUI</span><span class="token punctuation">.</span><span class="token method function property-access">add</span><span class="token punctuation">(</span><span class="token string">\'mod2\'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter"><span class="token constant">Y</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token constant">Y</span><span class="token punctuation">.</span><span class="token method function property-access">mod1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token comment">// Y.io(uri, config);</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'\'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    requires<span class="token operator">:</span> <span class="token punctuation">[</span>\n        <span class="token string">\'mod1\'</span>\n    <span class="token punctuation">]</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>为了使模块依赖关系的检测自动化，我们创建了模块依赖关系检测工具，它利用抽象语法树，分析出定义了哪些接口，使用了哪些接口，然后查找这些接口应该依赖哪些模块，进而找到模块依赖关系的错误，大致的过程如下：</p>\n<ol>\n<li>找到代码中模块定义（<code>YUI.add</code>）的部分</li>\n<li>分析每个模块内函数定义，变量定义，赋值语句等，找出符合要求（以 <code>Y</code> 开头）的输出接口（如 <code>mod1</code> 中的 <code>Y.mod1</code>）</li>\n<li>生成「接口 - 模块」对应关系</li>\n<li>分析每个模块内函数调用，变量使用等，找出符合要求的输入接口（如 <code>mod2</code> 中的 <code>Y.one</code>，<code>Y.Array.each</code>，<code>Y.mod1</code>）</li>\n<li>通过「接口 - 模块」对应关系，找到此模块应该依赖哪些其他模块</li>\n<li>分析 requires 中是否有错误</li>\n</ol>\n<p>使用此工具，保证每次提交代码时，依赖关系都是正确无误的，它帮助我们实现了模块依赖关系检测的自动化。</p>\n<h2 id="%E6%80%BB%E7%BB%93">总结<a class="anchor" href="#%E6%80%BB%E7%BB%93">§</a></h2>\n<p>抽象语法树在计算机领域中应用广泛，以上仅讨论了抽象语法树在 JavaScript 中的一些应用，期待更多的用法等着大家去尝试和探索。</p>\n<h2 id="reference">Reference<a class="anchor" href="#reference">§</a></h2>\n<ol>\n<li><a href="http://en.wikipedia.org/wiki/Abstract_syntax_tree">Wikipedia AST</a></li>\n<li><a href="http://lisperator.net/uglifyjs/">UglifyJS</a></li>\n<li><a href="http://yuilibrary.com/yui/docs/api/files/node_js_node-event-simulate.js.html#l1">node-event-simulate</a></li>\n<li><a href="http://yuilibrary.com/yui/docs/api/classes/Array.html#method_each">Y.Array.each</a></li>\n</ol>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E6%98%AF%E4%BB%80%E4%B9%88">抽象语法树是什么</a></li><li><a href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E4%B8%BE%E4%BE%8B">抽象语法树举例</a></li><li><a href="#javascript-%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">JavaScript 抽象语法树</a><ol><li><a href="#uglifyjs">UglifyJS</a></li><li><a href="#uglifyjs-tools">UglifyJS Tools</a></li><li><a href="#%E7%94%9F%E6%88%90%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">生成抽象语法树</a></li><li><a href="#%E4%BD%BF%E7%94%A8-mangler-%E5%8E%8B%E7%BC%A9%E4%BB%A3%E7%A0%81">使用 mangler 压缩代码</a></li><li><a href="#%E4%BD%BF%E7%94%A8-walker-%E9%81%8D%E5%8E%86%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91">使用 walker 遍历抽象语法树</a></li></ol></li><li><a href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E7%9A%84%E5%BA%94%E7%94%A8">抽象语法树的应用</a><ol><li><a href="#%E5%88%A9%E7%94%A8%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E9%87%8D%E6%9E%84-javascript-%E4%BB%A3%E7%A0%81">利用抽象语法树重构 JavaScript 代码</a></li><li><a href="#%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%E5%9C%A8%E7%BE%8E%E5%9B%A2%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8">抽象语法树在美团中的应用</a></li></ol></li><li><a href="#%E6%80%BB%E7%BB%93">总结</a></li><li><a href="#reference">Reference</a></li></ol></nav>'
        } }),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2014-10-08T00:00:00.000Z",
    'updated': "2020-11-07T02:33:59.000Z",
    'excerpt': "抽象语法树是什么 果然比较抽象，不如先看几个例子： 抽象语法树举例 foo = 'hello world'; /* +-------------+ | assign(=) | +-------------+ X X X X +-------+ +-----------------+ | foo | | 'hello world' | +-------+ +...",
    'cover': undefined,
    'categories': [
        "编程世界"
    ],
    'tags': [
        "AST",
        "UglifyJS",
        "JavaScript"
    ],
    'blog': {
        "isPost": true,
        "posts": [
            {
                "pagePath": "posts/google_analytics.md",
                "title": "Google Analytics 的 Tracking ID 不见了？",
                "link": "posts/google_analytics.html",
                "date": "2020-11-16T13:01:58.000Z",
                "updated": "2020-11-16T13:24:46.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Google Analytics"
                ],
                "excerpt": "最近新创建了一个 Google Analytics 的 Property（媒体资源），但是找不到它的 Tracking ID 了。根据文档，需要创建一个 Data Stream，然后通过这样的方式引入一个被称为 gtag.js 的代码： <!-- Global site tag (gtag.js) - G..."
            },
            {
                "pagePath": "posts/design_pagic_config_ts.md",
                "title": "设计 pagic.config.ts",
                "link": "posts/design_pagic_config_ts.html",
                "date": "2020-07-12T00:00:00.000Z",
                "updated": "2020-11-08T17:05:30.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Pagic"
                ],
                "excerpt": "作为一名资深博客爱好者，我热衷于折腾各种博客系统，写过多个博客主题。 终于，写主题也无法得到满足，我开始写博客系统了。 或者说是更广义的，静态网站生成器。 如今 Pagic 已经完成了一个雏形，我也邀请了一些朋友试用，经..."
            },
            {
                "pagePath": "posts/types_of_tests.md",
                "title": "测试的分类",
                "link": "posts/types_of_tests.html",
                "date": "2019-03-11T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "测试"
                ],
                "excerpt": "一直以来，我都听到过各式各样的测试——单元测试、黑盒测试、压力测试等等，但是很难对所有的测试方式有一个总体的认知。 在经过大量的谷歌之后，我终于把各种种类的测试弄清白了，下面针对每一种测试做一个简单的一句话介绍，..."
            },
            {
                "pagePath": "posts/puppeteer_tutorial.md",
                "title": "Puppeteer 指南",
                "link": "posts/puppeteer_tutorial.html",
                "date": "2018-09-18T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "JavaScript",
                    "Puppeteer"
                ],
                "excerpt": "Puppeteer 是 Google Chrome 出品的一个无头浏览器。如果你听说过 Phantomjs 或者 Selenium，那么就应该知道它是做什么的了。Puppeteer 与它们类似，提供了一系列 api，通过 DevTools 协议控制 Chromium/Chrome 浏览器的行为。...",
                "cover": "../assets/puppeteer_turorial/puppeteer-structure.png"
            },
            {
                "pagePath": "posts/how-to-get-changelist-in-git-push-hook.md",
                "title": "How to Get Changelist in Git Push Hook",
                "link": "posts/how-to-get-changelist-in-git-push-hook.html",
                "date": "2017-09-26T00:39:25.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Git",
                    "Git Hooks"
                ],
                "excerpt": "Git hooks is a useful tool to run scripts before or after events. We usually use it to check the format of commit message, lint our code, prevent pushing code to master branch, or run test scripts before pushin..."
            },
            {
                "pagePath": "posts/cqc.md",
                "title": "运行一个脚本，看看你的项目的代码质量吧",
                "link": "posts/cqc.html",
                "date": "2017-09-20T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "代码质量",
                    "代码复杂度"
                ],
                "excerpt": "代码质量有很多指标： 1. 源代码行数 2. 代码重复率 3. 圈复杂度 4. 报错量（ Bug 数）占比 5. 测试覆盖率 6. 开发约束（代码块行数等） 我做了一个脚本可以测出上面的 1, 2, 3 大家都来试一试吧！ Supported Languages - js, ..."
            },
            {
                "pagePath": "posts/mobi-css_v3.md",
                "title": "Mobi.css v3 发布了，一个轻量、可拓展、移动端优先的 CSS 框架",
                "link": "posts/mobi-css_v3.html",
                "date": "2017-09-04T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Mobi.css",
                    "CSS"
                ],
                "excerpt": " - GitHub: https://github.com/mobi-css/mobi.css - 官网：http://getmobicss.com/ 简单介绍 - 轻量级：压缩 gzip 后只有 2.6 kb - 可拓展：可以引入 plugin 来拓展 Mobi.css ，并且每个 plugin 都可以独立于框架使用 - 移动端..."
            },
            {
                "pagePath": "posts/eslint-config-alloy.md",
                "title": "我花了两个月时间，定制出了心目中「完美」的 ESLint 规则，我用四个空格缩进",
                "link": "posts/eslint-config-alloy.html",
                "date": "2017-08-25T00:00:00.000Z",
                "updated": "2020-11-08T17:05:30.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "ESLint"
                ],
                "excerpt": "我们依据以下三条原则，研读了 ESLint 所有的配置项，定制出了心目中的「完美」ESLint 配置。"
            },
            {
                "pagePath": "posts/mazimd_v2.md",
                "title": "码字 md 发布 v2 啦",
                "link": "posts/mazimd_v2.html",
                "date": "2017-07-17T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "mazimd",
                    "Markdown"
                ],
                "excerpt": "码字 md 是一个在线 markdown 编辑器，自发布以来一直收到很多好评： 前帖：码字 md - 干净精致的 Markdown 编辑器 码字 md v2 更新内容 已完成 - [x] 支持永久保存 - [x] 支持衍生 TODOs - [ ] 支持包含过期时间的保存 - [ ] ..."
            },
            {
                "pagePath": "posts/test_coverage_for_github.md",
                "title": "GitHub 上的测试覆盖率",
                "link": "posts/test_coverage_for_github.html",
                "date": "2017-03-12T08:27:05.000Z",
                "updated": "2020-11-08T17:05:30.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "测试覆盖率",
                    "测试",
                    "GitHub"
                ],
                "excerpt": "开源项目的 README.md 中，一般都会在前面放上一些 badge，除了可以让读者快速的了解项目的一些信息以外，还为 README.md 添加了些许色彩。以 Pagic 为例： - 上图中的 build passing 表示 travis build 通过了，用绿色背景显示...",
                "cover": "../assets/test_coverage_for_github/pagic.png"
            },
            {
                "pagePath": "posts/about_me.md",
                "title": "三分钟创建一个简单精致的 About Me 页面",
                "link": "posts/about_me.html",
                "date": "2017-02-13T12:03:15.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "GitHub"
                ],
                "excerpt": "一个「About Me」页面，能够使别人快速的对你有一个大致的了解。 使用 GitHub 提供的 Pages 服务，可以将静态的网页托管在 GitHub 上。而 GitHub Pages 默认的 Jekyll 使得静态网页得以很方便的配置化。 我的 About Me 页面精雕..."
            },
            {
                "pagePath": "posts/flico.md",
                "title": "晒键盘 - FILCO 87 双模忍者圣手二代 黑色青轴",
                "link": "posts/flico.html",
                "date": "2017-01-29T09:51:31.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "多彩生活"
                ],
                "tags": [
                    "Flico",
                    "键盘"
                ],
                "excerpt": "关注了很久，这款键盘终于又有货了！ 没抢到什么优惠券，狠下心还是入手了。 目前用起来还不错，比 2016 mbp 13 寸大一些。 ",
                "cover": "../assets/flico/FLICO-01.jpeg"
            },
            {
                "pagePath": "posts/full_color_screen.md",
                "title": "随手撸了个测试屏幕坏点的网页",
                "link": "posts/full_color_screen.html",
                "date": "2017-01-18T16:22:34.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "excerpt": "新入手的 MacBook Pro 需要测试屏幕坏点，随手撸了一个，需要的人拿去吧~ GitHub: https://github.com/hack1day/full-color-screen Usage - Open http://full-color-screen.hack1day.com - Press SPACE or ENTER or click anyw..."
            },
            {
                "pagePath": "posts/my_first_book.md",
                "title": "我写的第一本书《TypeScript 入门教程》",
                "link": "posts/my_first_book.html",
                "date": "2017-01-17T09:55:08.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "TypeScript",
                    "Tutorial"
                ],
                "excerpt": "持续了大半年的学习和写作，在今天终于告一段落了。 写书之旅 最初有写书的想法，是刚加入微软的时候。 由于工作中需要重度使用 TypeScript，所以我花了几天的时间研读了好几遍官方手册和中文翻译版。 对于一个把 OOP 早就还给..."
            },
            {
                "pagePath": "posts/2016_summery.md",
                "title": "我的 2016 年总结",
                "link": "posts/2016_summery.html",
                "date": "2017-01-06T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "多彩生活"
                ],
                "tags": [
                    "总结思考"
                ],
                "excerpt": "出游土耳其 2016 年 2 月，我去土耳其游玩了半个月。 即使是我蹩脚的英语，也挡不住土耳其人的热情。 蔚蓝的天空和大海： 形似雪山的棉花堡： 外星地貌的卡帕多奇亚 遍地清真寺的伊斯坦布尔 这里留下了太多回忆。 入职微软 之前...",
                "cover": "../assets/2016_summery/turkey_ocean.jpg"
            },
            {
                "pagePath": "posts/mazimd.md",
                "title": "码字 md - 干净精致的 Markdown 编辑器",
                "link": "posts/mazimd.html",
                "date": "2017-01-01T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "mazimd",
                    "Markdown"
                ],
                "excerpt": "新写了一个 Online Markdown 编辑器，目前还不是很完善。 先分享出来，希望大家会喜欢。 码字 md 介绍 - 基于 SimpleMDE 和 Mobi.css，加入了中文适配 - 精致的预览页，可以直接拷贝到 word 或导出为 pdf （开发中） - 主题可单..."
            },
            {
                "pagePath": "posts/happy-birthday-26.md",
                "title": "写给 26 岁的自己",
                "link": "posts/happy-birthday-26.html",
                "date": "2016-12-14T12:42:22.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "多彩生活"
                ],
                "tags": [
                    "生日快乐"
                ],
                "excerpt": "今天是我 26 岁的生日，Google 送给我了一个 doodle： 年终将至，工作变得繁忙起来。 总结还是留到跨年的时候再写吧。 最近比较浮躁，希望自己将来能够脚踏实地的进步，厚积而薄发。 加油！",
                "cover": "../assets/happy-birthday-26/google-user-birthday.gif"
            },
            {
                "pagePath": "posts/on_call.md",
                "title": "在微软 on call 的经历",
                "link": "posts/on_call.html",
                "date": "2016-11-12T09:15:40.000Z",
                "updated": "2020-11-10T13:57:51.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "On call",
                    "微软",
                    "总结思考"
                ],
                "excerpt": "之前一直听说微软、亚马逊等企业需要 on call，但是不清楚具体要做什么。 上周第一次在微软 on call，写一点感受。 On call 是什么 就是需要保持电话畅通，随时都可能接到电话说哪个服务挂了，哪个测试失败了等等。 然后需要具..."
            },
            {
                "pagePath": "posts/hexo-theme-mobi-css.md",
                "title": "基于 Mobi.css 的官方 Hexo 主题",
                "link": "posts/hexo-theme-mobi-css.html",
                "date": "2016-10-30T14:40:54.000Z",
                "updated": "2020-11-10T13:57:51.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Hexo",
                    "Mobi.css"
                ],
                "excerpt": "Demo: 我的博客和 Mobi.css 官方文档 经过多天的开发，基于 Mobi.css 的 Hexo 主题终于完成了。 特性介绍 - 支持移动端，Mobi.css 是一个轻量灵活的移动端 CSS 框架，这是它的官方 Hexo 主题 - 支持多语言，既可以写博客（我的..."
            },
            {
                "pagePath": "posts/half_year_in_microsoft.md",
                "title": "我来微软这半年",
                "link": "posts/half_year_in_microsoft.html",
                "date": "2016-10-23T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "总结思考",
                    "微软"
                ],
                "excerpt": "转眼间已经离开美团，来到微软半年了。 背景 在刚加入微软的时候，我打算过了一个月就写个月度总结。结果一个月后，发现啥都不懂。 于是想再过一阵子来写个季度总结吧。结果一个季度后，感觉对业务还是一知半解。 于是想再过一..."
            },
            {
                "pagePath": "posts/600_stars_in_7_days.md",
                "title": "7 天 600 stars， Mobi.css 是如何诞生的",
                "link": "posts/600_stars_in_7_days.html",
                "date": "2016-09-05T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Mobi.css",
                    "总结思考"
                ],
                "excerpt": "Mobi.css 是一个轻量、灵活的移动端 CSS 框架。发布一周以来，获得了 600+ stars，登上了 GitHub Trending Top1（CSS），在 Hacker News 上进入了前三。 这篇文章会先介绍一下创造 Mobi.css 的思路，再介绍一下我在推广 Mobi.c..."
            },
            {
                "pagePath": "posts/mobi-css.md",
                "title": "「Mobi.css」轻量，灵活的移动端 css 框架",
                "link": "posts/mobi-css.html",
                "date": "2016-08-29T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Mobi.css",
                    "CSS"
                ],
                "excerpt": "最近做了一个 CSS 框架，颇废了一番功夫。 这里先把它分享给大家，欢迎 Star，欢迎试用！ - GitHub - Homepage 简单介绍 Mobi.css 是一个轻量，灵活的移动端 CSS 框架。特点如下： - 压缩后只有 4.6kb，比 Skeleton、Pure.css、...",
                "cover": "https://i.v2ex.co/6v65Q0LY.png"
            },
            {
                "pagePath": "posts/two_hexo_plugins.md",
                "title": "撸了两个 Hexo 的 Plugins",
                "link": "posts/two_hexo_plugins.html",
                "date": "2016-07-01T11:10:46.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Hexo",
                    "JavaScript"
                ],
                "excerpt": "都是从 git log 获取数据填充到 posts 中： hexo-filter-date-from-git - 获取 post 的第一个提交的 date 作为 front-matter 中的 date - 获取 post 的最后一个提交的 date 作为 front-matter 中的 updated 解决的问题 hexo 中..."
            },
            {
                "pagePath": "posts/hexo-theme-wiki-i18n.md",
                "title": "新姿势：在 GitHub 基于 Hexo 写 Wiki",
                "link": "posts/hexo-theme-wiki-i18n.html",
                "date": "2016-06-25T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Wiki",
                    "Hexo"
                ],
                "excerpt": "最近想尝试下用 Hexo 写 Wiki ，发现还挺酷的，所以把主题和一些插件提取出来了，分享给大家。 先上链接 - 主题：wiki-i18n - Demo ：JS Index - Demo 的 Repo ：JS Index repo - 插件，按字母顺序归档：hexo-generator-archiv...",
                "cover": "../assets/hexo-theme-wiki-i18n/screenshot_1.png"
            },
            {
                "pagePath": "posts/setup_linux_workspace_in_windows_using_hyper-v.md",
                "title": "在 Windows 中配置 Linux 工作环境（使用 Hyper-V）",
                "link": "posts/setup_linux_workspace_in_windows_using_hyper-v.html",
                "date": "2016-05-20T07:57:04.000Z",
                "updated": "2020-11-11T13:06:02.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Hyper-V",
                    "Samba",
                    "Windows"
                ],
                "excerpt": "基于上次 v2ex 上的建议，这次选择的方案是：Hyper-V + Ubuntu + PuTTY + Samba。 Hyper-V Hyper-V 是微软的一款虚拟化产品。Windows Server 2008 或者 Windows 7 以上就可以使用了。 如果你使用的是 Windows 7，按如下方式开启..."
            },
            {
                "pagePath": "posts/debug_android_browser_in_chrome.md",
                "title": "在 Chrome 中调试 Android 浏览器",
                "link": "posts/debug_android_browser_in_chrome.html",
                "date": "2016-04-28T09:53:39.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Debug",
                    "Android"
                ],
                "excerpt": "最近需要使用 Chrome Developer Tools 调试 Android 浏览器，但是官方指南并不是很好使，经过一番折腾，终于调试成功了，在此把经验分享给需要的朋友。 Chrome Developer Tools 是前端工程师必不可少的工具，它极大的提高了我们...",
                "cover": "../assets/debug_android_browser_in_chrome/android_build_number.png"
            },
            {
                "pagePath": "posts/setup_linux_workspace_in_windows.md",
                "title": "在 Windows 中配置 Linux 工作环境",
                "link": "posts/setup_linux_workspace_in_windows.html",
                "date": "2016-04-25T03:37:38.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "VituralBox",
                    "Linux",
                    "Windows"
                ],
                "excerpt": "2016-05-20 更新：可以使用更加先进的 Hyper-V + Samba 方案。 要在 Windows 上使用 Linux，最方便最好用的就是装个虚拟机，再用 SSH 连上了。Linux 当然选择无图形界面的 Server 版，所以还需要能够方便的在 Windows 上访问到..."
            },
            {
                "pagePath": "posts/if_the_human_race_die_out.md",
                "title": "假如人类灭绝了，可以留给下一个文明有限的遗产，那么该留些什么呢？",
                "link": "posts/if_the_human_race_die_out.html",
                "date": "2016-01-31T01:42:54.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "excerpt": "这种情况下，是否人文比科学更有价值？更能证明人类的存在？ 科学是客观存在的，在很长的时间跨度下，科技树总有一天会被再次点满，下个文明总有人会发明三角函数，微积分，肯定有人会发现牛顿力学（虽然下一个文明肯定不叫牛顿..."
            },
            {
                "pagePath": "posts/learn_typescript.md",
                "title": "Learn TypeScript",
                "link": "posts/learn_typescript.html",
                "date": "2016-01-29T03:52:52.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "TypeScript",
                    "JavaScript"
                ],
                "excerpt": "2016-05-20 更新：打算写成一个系列，放到独立的 repo 中，此篇会拆分为系列的一部分，在此仅做存档。 它的第一个版本发布于 2012 年 10 月，经历了多次更新后，现在已成为前端社区中不可忽视的力量，不仅在 Microsoft 内部得到..."
            },
            {
                "pagePath": "posts/bootstrap_4_preview.md",
                "title": "Bootstrap 4 初探",
                "link": "posts/bootstrap_4_preview.html",
                "date": "2016-01-12T12:11:56.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Bootstrap",
                    "CSS"
                ],
                "excerpt": "Bootstrap 作为 GitHub 上 Stars 最多的项目，可以说是万众瞩目，issues 和 pull requests 也居高不下，足以看出其后劲依然很足。 截止到本文发布，Bootstrap 4 已经推出 alpha 2 版本一个多月了，让我们一起玩转 Bootstrap 4 ..."
            },
            {
                "pagePath": "posts/the_way_to_become_a_senior_software_engineer.md",
                "title": "高级工程师之路",
                "link": "posts/the_way_to_become_a_senior_software_engineer.html",
                "date": "2015-12-25T13:37:55.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "高级工程师",
                    "总结思考"
                ],
                "excerpt": "美团对工程师文化非常重视，我有幸参加了公司的第三期高工训练营，听到了各个大牛的分享，觉得不能无所作为，于是想对每一期有个总结思考，并对接下来的行动有个计划。 PPT 就不放出来了，欢迎大家加入美团一起成长。 做好技术..."
            },
            {
                "pagePath": "posts/important_announcement_regarding_yui.md",
                "title": "关于 YUI 的重要公告",
                "link": "posts/important_announcement_regarding_yui.html",
                "date": "2015-12-06T12:04:30.000Z",
                "updated": "2020-11-08T17:05:30.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "YUI",
                    "JavaScript",
                    "翻译"
                ],
                "excerpt": "译者按：YUI 伴随着我两年有余，我见证了它的伟大与落魄。它开创了模块加载，发扬了命名空间。它有强大的事件和控件机制，也有臃肿的条件加载和皮肤。它的精髓有如一座图书馆，让你不由得感慨设计之宏大，它的 features 有如一..."
            },
            {
                "pagePath": "posts/javascript_fetch_api.md",
                "title": "JavaScript Fetch API",
                "link": "posts/javascript_fetch_api.html",
                "date": "2015-11-10T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Fetch",
                    "JavaScript",
                    "分享"
                ],
                "excerpt": "JavaScript Fetch API from Xcat Liu"
            },
            {
                "pagePath": "posts/fetch_api.md",
                "title": "Fetch API",
                "link": "posts/fetch_api.html",
                "date": "2015-11-08T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Fetch",
                    "翻译",
                    "JavaScript"
                ],
                "excerpt": ""
            },
            {
                "pagePath": "posts/isarray.md",
                "title": "从 isArray 谈起",
                "link": "posts/isarray.html",
                "date": "2015-11-03T10:16:17.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Array",
                    "JavaScript"
                ],
                "excerpt": "怎么判断数组是前端面试经常被问到的一个问题，数组也是最难以准确判断的类型之一。今天咱们就来谈谈如何判断数组。 typeof typeof 是 JavaScript 中判断类型的运算符，语法如下1： typeof operand 可是 typeof 返回的结果不尽..."
            },
            {
                "pagePath": "posts/seminar_in_wuhan.md",
                "title": "武汉宣讲会",
                "link": "posts/seminar_in_wuhan.html",
                "date": "2015-09-28T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "多彩生活"
                ],
                "tags": [
                    "总结思考"
                ],
                "excerpt": "今年有幸和刘江老师还有 zj 美女一起参加了武汉的宣讲会，我负责师兄师姐交流的部分。有一些感想： - 会后没有笔试环节，来的人数明显少多了 - 产品今年就业压力太大，大部分都是产品来听，顺便询问还招不招产品 - 刘江老师的演..."
            },
            {
                "pagePath": "posts/three_lines_poems.md",
                "title": "撸了一个三行情诗表白网页，可朋友圈分享，但是卡爆了",
                "link": "posts/three_lines_poems.html",
                "date": "2015-08-20T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Canvas",
                    "JavaScript"
                ],
                "excerpt": "请在手机上访问（或者把 Chrome 开发者模式打开，调整为 iPhone 6[+] 模式） 链接：http://xcatliu.github.io/rose/ GitHub: https://github.com/xcatliu/rose 由于网站太简单了只有 100+ 行代码，所以 css js 都 inline 了，但..."
            },
            {
                "pagePath": "posts/react_native_and_v2hot.md",
                "title": "React Native and V2HOT",
                "link": "posts/react_native_and_v2hot.html",
                "date": "2015-07-10T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "React Native",
                    "V2HOT",
                    "分享"
                ],
                "excerpt": "React Native & V2HOT from Xcat Liu"
            },
            {
                "pagePath": "posts/developing_react_components.md",
                "title": "React 组件开发",
                "link": "posts/developing_react_components.html",
                "date": "2015-06-26T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "React",
                    "JavaScript",
                    "分享"
                ],
                "excerpt": "受 StuQ 的邀请，去录制了一期节目，羞涩ing~ React 组件开发 from Xcat Liu"
            },
            {
                "pagePath": "posts/memorial_at_the_insistence_of_365_days.md",
                "title": "纪念一下 365 天的坚持",
                "link": "posts/memorial_at_the_insistence_of_365_days.html",
                "date": "2015-06-17T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "excerpt": "主要贡献： - 创建了 20 多个开源项目（虽然大多数黄了） - fork 了 10 多个开源项目（虽然贡献不多） - star 了 200 多个项目 - 得到了 100 多个 star - 认识了 40 多个人 - 做了 60 多道算法题（虽然很多是 easy 的） - 虽然...",
                "cover": "https://i.v2ex.co/Ha5GKxxI.jpeg"
            },
            {
                "pagePath": "posts/v2hot_published.md",
                "title": "V2HOT 终于上线了，欢迎下载",
                "link": "posts/v2hot_published.html",
                "date": "2015-05-16T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "V2HOT",
                    "React Native"
                ],
                "excerpt": "GitHub: https://github.com/xcatliu/v2hot 快速下载：https://itunes.apple.com/cn/app/v2hot/id992150357?mt=8 --------------------------------------------------------------------------------------------------------...",
                "cover": "https://i.v2ex.co/feN495xC.png"
            },
            {
                "pagePath": "posts/geojson_and_topojson.md",
                "title": "GeoJSON 和 TopoJSON",
                "link": "posts/geojson_and_topojson.html",
                "date": "2015-04-24T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "GeoJSON",
                    "TopoJSON",
                    "JSON"
                ],
                "excerpt": "GeoJSON GeoJSON 使用 type 表示数据的类型。 当 type 取值 Point、LineString、Polygon、MultiPoint、MultiLineString、MultiPolygon 或 GeometryCollection 时，用来表示几何图。 当 type 取值 Feature 时，除了几何图外，还..."
            },
            {
                "pagePath": "posts/semantic_versioning_and_npm.md",
                "title": "npm 语义化版本号",
                "link": "posts/semantic_versioning_and_npm.html",
                "date": "2015-04-14T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "语义化",
                    "npm",
                    "JavaScript"
                ],
                "excerpt": "认识 npm 版本号 每一个 node package 都有自己的版本号，一般定义在项目的 package.json 中，如： { \"name\": \"express\", \"description\": \"Fast, unopinionated, minimalist web framework\", \"version\": \"4.12.3\", \"author\": \"..."
            },
            {
                "pagePath": "posts/hello_2015.md",
                "title": "展望 2015",
                "link": "posts/hello_2015.html",
                "date": "2015-01-01T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "多彩生活"
                ],
                "tags": [
                    "计划",
                    "总结思考"
                ],
                "excerpt": "2015 年就要来了，煽情的话就不说了，这里统计一下 2014 年做过的事，以及对 2015 年的展望。 2014 年做过的事 2014Q1 - 过年在家休息了 10 多天 - 阅读《可维护性 JavaScript》 - 阅读《高性能 JavaScript》 - Highcharts - y..."
            },
            {
                "pagePath": "posts/use_readme_to_manage_your_docs.md",
                "title": "基于 README 的文档管理",
                "link": "posts/use_readme_to_manage_your_docs.html",
                "date": "2014-12-09T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "README",
                    "Markdown"
                ],
                "excerpt": "什么是 readme 为什么要在仓库中写文档 - 文档和代码在一起，方便查看 - 文档和代码版本一致 - 使用 markdown 格式的 README 文档可以在 GitHub 中直接查看 - 可以在 vim 中查看 - README 已经能（并且能更好的）满足大部分需求..."
            },
            {
                "pagePath": "posts/thinking_in_react.md",
                "title": "Thinking in React",
                "link": "posts/thinking_in_react.html",
                "date": "2014-12-04T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "React",
                    "分享"
                ],
                "excerpt": "Thinking in React from Xcat Liu"
            },
            {
                "pagePath": "posts/campus_recruitment.md",
                "title": "校招季",
                "link": "posts/campus_recruitment.html",
                "date": "2014-11-03T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "多彩生活"
                ],
                "tags": [
                    "校招"
                ],
                "excerpt": "一年一度的校招季快要结束了，同学们是不是拿 offer 拿到手软呢？ 今年我有幸参与了合肥南京和武汉的校招工作，忙碌之后终于有时间把这段珍贵的经历记录下来。 合肥 五个小时的高铁，迎接我们的是磅礴的大雨，人头攒动的火车站..."
            },
            {
                "pagePath": "posts/hybrid_app_and_webviewjavascriptbridge.md",
                "title": "Hybrid App & WebViewJavascriptBridge",
                "link": "posts/hybrid_app_and_webviewjavascriptbridge.html",
                "date": "2014-10-27T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "Hybrid App",
                    "WebViewJavascriptBridge",
                    "JavaScript"
                ],
                "excerpt": "实现原理 Hybrid App 的原理很简单——在原生应用中开启一个网页。可以是全屏都交给网页，或者是一部分（比如导航栏）由原生应用实现，另一部分是一个网页。 技术细节 H5 页面的实现 作为前端，对这块应该已经很熟悉了，与传统..."
            },
            {
                "pagePath": "posts/design_patterns.md",
                "title": "设计模式浅析",
                "link": "posts/design_patterns.html",
                "date": "2014-10-24T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "设计模式",
                    "分享"
                ],
                "excerpt": "设计模式浅析 from Xcat Liu"
            },
            {
                "pagePath": "posts/abstract_syntax_tree.md",
                "title": "抽象语法树在 JavaScript 中的应用",
                "link": "posts/abstract_syntax_tree.html",
                "date": "2014-10-08T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "AST",
                    "UglifyJS",
                    "JavaScript"
                ],
                "excerpt": "抽象语法树是什么 果然比较抽象，不如先看几个例子： 抽象语法树举例 foo = 'hello world'; /* +-------------+ | assign(=) | +-------------+ X X X X +-------+ +-----------------+ | foo | | 'hello world' | +-------+ +..."
            },
            {
                "pagePath": "posts/modular_javascript.md",
                "title": "Modular JS",
                "link": "posts/modular_javascript.html",
                "date": "2014-03-06T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "模块化",
                    "JavaScript"
                ],
                "excerpt": "概述，发展 模块化定义 - 一种将系统分离成独立功能部分的方法 - 优缺点 js 模块化发展 - 内容样式交互混合 - 分离成独立文件 - 动态加载 - 服务器端 js，CommonJS - 发展到客户端 AMD CommonJS CommonJS 规范 - CommonJS API ..."
            },
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
                "pagePath": "posts/the_many_meanings_of_open.md",
                "title": "The Many Meanings of Open",
                "link": "posts/the_many_meanings_of_open.html",
                "date": "2013-11-08T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "多彩生活"
                ],
                "tags": [
                    "总结思考"
                ],
                "excerpt": "参加万维网之父、万维网联盟创始人见面会的感想"
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
            },
            {
                "pagePath": "posts/monthly_summery_in_meituan.md",
                "title": "美团一个月",
                "link": "posts/monthly_summery_in_meituan.html",
                "date": "2013-01-04T00:00:00.000Z",
                "updated": "2020-11-07T02:33:59.000Z",
                "author": "xcatliu",
                "contributors": [
                    "xcatliu"
                ],
                "categories": [
                    "编程世界"
                ],
                "tags": [
                    "总结思考"
                ],
                "excerpt": "初来乍到 来美团已有一个月零四天，有幸见证了月销售额突破七亿和八亿的时刻，认识了志同道合的朋友，加入了这个飞速成长的大家庭。 学习与成长 vim 和 git 磨刀不误砍柴工，只有运用好了这些最基本的工具，才能在工作中得心应..."
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
        ]
    }
};

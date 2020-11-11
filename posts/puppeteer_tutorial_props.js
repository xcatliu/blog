import projectConfig from '/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig },
    'pagePath': "posts/puppeteer_tutorial.md",
    'layoutPath': "posts/_layout.tsx",
    'outputPath': "posts/puppeteer_tutorial.html",
    'title': "Puppeteer 指南",
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<h1>Puppeteer 指南</h1>\n<p>Puppeteer 是 Google Chrome 出品的一个无头浏览器。如果你听说过 Phantomjs 或者 Selenium，那么就应该知道它是做什么的了。Puppeteer 与它们类似，提供了一系列 api，通过 DevTools 协议控制 Chromium/Chrome 浏览器的行为。</p>\n<h2 id="%E4%BB%80%E4%B9%88%E6%98%AF%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8">什么是无头浏览器<a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%98%AF%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8">§</a></h2>\n<p>无头浏览器就是没有用户界面的浏览器，即通过写脚本来使用无头浏览器访问网站，还可以做一些点击等行为。</p>\n<p>Puppeteer 一般使用无头的模式运行，这样的开销较小。当然也提供了使用完整的 Chromium/Chrome 来运行的模式。</p>\n<h2 id="puppeteer-%E8%83%BD%E5%81%9A%E4%BB%80%E4%B9%88">Puppeteer 能做什么<a class="anchor" href="#puppeteer-%E8%83%BD%E5%81%9A%E4%BB%80%E4%B9%88">§</a></h2>\n<p>能够做几乎所有浏览器能做的事情。</p>\n<ul>\n<li>网页截图，或生成 pdf</li>\n<li>爬取 SPA 或 SSR 网站</li>\n<li>自动化表单提交，UI测试，键盘输入等</li>\n<li>创建一个最新的自动化测试环境。使用最新的 js 和最新的 Chrome 浏览器运行测试用例</li>\n<li>捕获网站的时间线，帮助诊断性能问题</li>\n<li>测试 Chrome 插件</li>\n</ul>\n<h2 id="puppeteer-%E4%B8%8E%E5%85%B6%E4%BB%96%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB">Puppeteer 与其他无头浏览器有什么区别？<a class="anchor" href="#puppeteer-%E4%B8%8E%E5%85%B6%E4%BB%96%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB">§</a></h2>\n<ul>\n<li>Puppeteer 由 Google Chrome 维护，速度快、安全、稳定、易用</li>\n<li>其他无头浏览器可以支持多种浏览器环境（Safari, Chrome, Firefox 等），而 Puppeteer 只支持 Chromium/Chrome</li>\n<li>Puppeteer 有完善的事件系统，不需要频繁的 <code>sleep(1000)</code> 了</li>\n<li>Puppeteer 的调试功能很强大，还支持在 DevTools 里面调试</li>\n<li>Puppeteer 能够创建一个「真实」的行为，如点击</li>\n</ul>\n<h2 id="%E5%AE%89%E8%A3%85-puppeteer">安装 Puppeteer<a class="anchor" href="#%E5%AE%89%E8%A3%85-puppeteer">§</a></h2>\n<p>先创建一个测试用的项目，执行 <code>npm init</code> 初始化好 <code>package.json</code>，然后执行以下命令安装 Puppeteer：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> puppeteer --save-dev\n</code></pre>\n<p>万事开头难，第一步安装时就会遇到问题（如果没有报错，请跳过这一段）。</p>\n<p>Puppeteer 安装过程中会去下载 Chromium，墙内用户则会报错。如果你看到以下信息，说明是下载 Chromium 时连接不上。</p>\n<pre class="language-bash"><code class="language-bash">ERROR: Failed to download Chromium r588429<span class="token operator">!</span> Set <span class="token string">"PUPPETEER_SKIP_CHROMIUM_DOWNLOAD"</span> <span class="token function">env</span> variable to skip download.\nError: Download failed: server returned code <span class="token number">502</span>. URL: <a class="token url-link" href="https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/588429/chrome-win32.zip">https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/588429/chrome-win32.zip</a>\n</code></pre>\n<p>或者</p>\n<pre class="language-bash"><code class="language-bash">ERROR: Failed to download Chromium r588429<span class="token operator">!</span> Set <span class="token string">"PUPPETEER_SKIP_CHROMIUM_DOWNLOAD"</span> <span class="token function">env</span> variable to skip download.\n<span class="token punctuation">{</span> Error: connect ETIMEDOUT <span class="token number">172.217</span>.24.48:443\n</code></pre>\n<p>如提示所说，设置 <code>PUPPETEER_SKIP_CHROMIUM_DOWNLOAD</code> 可以跳过安装 Chromium。</p>\n<pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">PUPPETEER_SKIP_CHROMIUM_DOWNLOAD</span><span class="token operator">=</span><span class="token number">1</span> <span class="token function">npm</span> <span class="token function">install</span> puppeteer --save-dev\n</code></pre>\n<p>此时可以安装成功，但是使用 Puppeteer 时会由于找不到 Chromium 而报错。可以创建一个文件 <code>test.js</code>，内容如下：</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">const</span> puppeteer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'puppeteer\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> browser <span class="token operator">=</span> <span class="token keyword control-flow">await</span> puppeteer<span class="token punctuation">.</span><span class="token method function property-access">launch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> page <span class="token operator">=</span> <span class="token keyword control-flow">await</span> browser<span class="token punctuation">.</span><span class="token method function property-access">newPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword control-flow">await</span> page<span class="token punctuation">.</span><span class="token method function property-access">goto</span><span class="token punctuation">(</span><span class="token string">\'<a class="token url-link" href="https://example.com">https://example.com</a>\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword control-flow">await</span> page<span class="token punctuation">.</span><span class="token method function property-access">screenshot</span><span class="token punctuation">(</span><span class="token punctuation">{</span>path<span class="token operator">:</span> <span class="token string">\'example.png\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword control-flow">await</span> browser<span class="token punctuation">.</span><span class="token method function property-access">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>然后执行 <code>node test.js</code> 则会报错：</p>\n<pre class="language-bash"><code class="language-bash">$ node test.js\n<span class="token punctuation">(</span>node:18368<span class="token punctuation">)</span> UnhandledPromiseRejectionWarning: Unhandled promise rejection <span class="token punctuation">(</span>rejection id: <span class="token number">1</span><span class="token punctuation">)</span>: Error: Chromium revision is not downloaded. Run <span class="token string">"npm install"</span> or <span class="token string">"yarn install"</span>\n<span class="token punctuation">(</span>node:18368<span class="token punctuation">)</span> <span class="token punctuation">[</span>DEP0018<span class="token punctuation">]</span> DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero <span class="token builtin class-name">exit</span> code.\n</code></pre>\n<p>一个解决方案是先手动下载 Chromium，然后在执行时通过配置指定 Chromium 位置，<a href="https://juejin.im/post/5b4a043751882519790c7ad7">这篇文章</a>给出了解决步骤。</p>\n<p>但是我更倾向于还原 Puppeteer 安装时的过程。但是由于一些环境原因，即便翻墙了也只能手动下载 Chromium，无法在安装 Puppeteer 时自动下载 Chromium。</p>\n<p>读了一下源码之后，可以这么解决：</p>\n<ol>\n<li>安装 Puppeteer，安装失败，提示无法下载 <code>https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/588429/chrome-win32.zip</code></li>\n<li>使用 <code>PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm install puppeteer --save-dev</code> 成功安装 Puppeteer</li>\n<li>执行 <code>node test.js</code> 提示无法找到 Chromium</li>\n<li>手动下载步骤 1 中的 <code>chrome-win32.zip</code>，注意不同版本、不同系统的下载地址是不一样的</li>\n<li>开启一个静态文件服务，使得 <code>http://127.0.0.1:8000/chrome-win32.zip</code> 指向需要下载的文件</li>\n<li>改写 <code>downloadURL</code> 方法，使其直接返回 <code>http://127.0.0.1:8000/chrome-win32.zip</code></li>\n<li>执行 <code>node ./node_modules/puppeteer/install.js</code> 完成安装</li>\n<li>执行 <code>node test.js</code> 测试能否成功生成截图</li>\n</ol>\n<p>至此，成功完成了 Puppeteer 的安装。</p>\n<h2 id="puppeteer-%E7%BB%93%E6%9E%84">Puppeteer 结构<a class="anchor" href="#puppeteer-%E7%BB%93%E6%9E%84">§</a></h2>\n<p>Puppeteer 通过 DevTools 协议控制 Chromium/Chrome 浏览器。它的结构和浏览器结构类似。</p>\n<blockquote>\n<p>下图中淡化显示的可以忽略</p>\n</blockquote>\n<p><img src="../assets/puppeteer_turorial/puppeteer-structure.png" alt="Puppeteer 结构"></p>\n<ul>\n<li>Puppeteer 通过 DevTools 协议控制 Chromium/Chrome 浏览器</li>\n<li>一个浏览器（Browser）实例可以包含多个浏览器上下文（Browser contexts），就像我们打开一个普通的 Chrome 之后又打开一个隐身模式的 Chrome</li>\n<li>一个浏览器上下文（BrowserContext）可以包含多个页面（Pages）</li>\n<li>一个页面（Page）包含至少一个主 frame，也可以包含其他 frames（在主 frame 中通过 iframe 或 frame 标签创建的）</li>\n<li>一个 frame 包含至少一个执行上下文（Execution context），也可以包含其他执行上下文（由 Chrome 插件创建的）</li>\n<li>一个 Workder 包含一个执行上下文，由 WebWorker 创建</li>\n</ul>\n<h2 id="puppeteer-api">Puppeteer API<a class="anchor" href="#puppeteer-api">§</a></h2>\n<p>Puppeteer 的大部分 API 的返回值都是 <code>Promise</code>，故推荐使用 <code>async</code> <code>await</code> 来处理异步操作。Puppeteer 的 API 包含以下类：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>类名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>Puppeteer</code></td>\n<td>主要用于创建一个浏览器实例，也可以用来下载新的 Chromium，或者设置浏览器的默认参数</td>\n</tr>\n<tr>\n<td><code>BrowserFetcher</code></td>\n<td>用于下载和管理 Chromium</td>\n</tr>\n<tr>\n<td><code>Browser</code></td>\n<td>可以创建一个或多个 Page</td>\n</tr>\n<tr>\n<td><code>BrowserContext</code></td>\n<td>创建一个隐身模式的浏览器时需要用到</td>\n</tr>\n<tr>\n<td><code>Page</code></td>\n<td><strong>主要 API，用于操作一个页面，后面会详细介绍</strong></td>\n</tr>\n<tr>\n<td><code>Worker</code></td>\n<td>用于处理 WebWorker</td>\n</tr>\n<tr>\n<td><code>Keyboard</code></td>\n<td>可以触发键盘按键</td>\n</tr>\n<tr>\n<td><code>Mouse</code></td>\n<td>可以触发鼠标动作</td>\n</tr>\n<tr>\n<td><code>TouchScreen</code></td>\n<td>可以触发触摸屏的动作</td>\n</tr>\n<tr>\n<td><code>Tracing</code></td>\n<td>用于分析性能</td>\n</tr>\n<tr>\n<td><code>Dialog</code></td>\n<td>存在于 page 的 <code>dialog</code> 事件回调中，表示调用弹窗后的对象，包括 <code>alert</code>, <code>beforeunload</code>, <code>confirm</code> 和 <code>prompt</code></td>\n</tr>\n<tr>\n<td><code>ConsoleMessage</code></td>\n<td>存在于 page 的 <code>console</code> 事件回调中，表示调用 <code>console.log</code> 等方法后的对象</td>\n</tr>\n<tr>\n<td><code>Frame</code></td>\n<td>常用于处理包含多个 frame 的页面。page 中的很多方法就是直接调用的主 frame 的方法</td>\n</tr>\n<tr>\n<td><code>ExecutionContext</code></td>\n<td>执行上下文存在于 frame、浏览器插件、worker 中。可以用来直接执行一段 js</td>\n</tr>\n<tr>\n<td><code>JSHandle</code></td>\n<td>通过 <code>page.evaluateHandle</code> 生成，用于将页面中的 handler 挑出来传递使用</td>\n</tr>\n<tr>\n<td><code>ElementHandle</code></td>\n<td>通过 <code>page.$</code> 生成，用于将页面中某个元素的 handler 挑出来传递使用</td>\n</tr>\n<tr>\n<td><code>Request</code></td>\n<td>在 <code>page.setRequestInterception</code> 方法中使用，可以处理页面的请求</td>\n</tr>\n<tr>\n<td><code>Response</code></td>\n<td>表示页面接收到的响应</td>\n</tr>\n<tr>\n<td><code>SecurityDetails</code></td>\n<td>表示页面的安全信息</td>\n</tr>\n<tr>\n<td><code>Target</code></td>\n<td>可以是 page, background_page, service_worker, browser 等</td>\n</tr>\n<tr>\n<td><code>CDPSession</code></td>\n<td>用于直接和 Devtools 通信</td>\n</tr>\n<tr>\n<td><code>Coverage</code></td>\n<td>用于分析 js 和 css 的代码被页面使用的比例</td>\n</tr>\n<tr>\n<td><code>TimeoutError</code></td>\n<td>超时错误</td>\n</tr>\n</tbody>\n</table></div>\n<h3 id="page">Page<a class="anchor" href="#page">§</a></h3>\n<p>Page 是 Puppeteer 中最重要的一个 API，也是它的核心所在，这里会介绍一些常用的 Page API。</p>\n<h4 id="%E8%AE%BE%E7%BD%AE%E9%A1%B5%E9%9D%A2%E7%8E%AF%E5%A2%83">设置页面环境<a class="anchor" href="#%E8%AE%BE%E7%BD%AE%E9%A1%B5%E9%9D%A2%E7%8E%AF%E5%A2%83">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.emulate</code></td>\n<td>设置 viewport 和 ua</td>\n</tr>\n<tr>\n<td><code>page.setViewport</code></td>\n<td>设置 viewport</td>\n</tr>\n<tr>\n<td><code>page.setUserAgent</code></td>\n<td>设置 ua</td>\n</tr>\n<tr>\n<td><code>page.setRequestInterception</code></td>\n<td><strong>中断所有请求，并可以修改请求的返回值</strong></td>\n</tr>\n<tr>\n<td><code>page.addScriptTag</code></td>\n<td>添加 js 脚本</td>\n</tr>\n<tr>\n<td><code>page.addStyleTag</code></td>\n<td>添加 css</td>\n</tr>\n<tr>\n<td><code>page.setContent</code></td>\n<td>设置整个 html</td>\n</tr>\n<tr>\n<td><code>page.setCacheEnabled</code></td>\n<td>设置缓存是否开启</td>\n</tr>\n<tr>\n<td><code>page.setExtraHTTPHeaders</code></td>\n<td>设置额外的 http 头</td>\n</tr>\n<tr>\n<td><code>page.setGeolocation</code></td>\n<td>设置地理位置</td>\n</tr>\n<tr>\n<td><code>page.setJavaScriptEnabled</code></td>\n<td>设置 js 是否开启</td>\n</tr>\n<tr>\n<td><code>page.setOfflineMode</code></td>\n<td>设置离线模式</td>\n</tr>\n<tr>\n<td><code>page.deleteCookie</code></td>\n<td>删除 cookies</td>\n</tr>\n<tr>\n<td><code>page.setCookie</code></td>\n<td>设置 cookies</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E6%A8%A1%E6%8B%9F%E5%8A%A8%E4%BD%9C">模拟动作<a class="anchor" href="#%E6%A8%A1%E6%8B%9F%E5%8A%A8%E4%BD%9C">§</a></h4>\n<p>一般会先滚动视窗到相应元素那，再执行动作。</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.click</code></td>\n<td>点击</td>\n</tr>\n<tr>\n<td><code>page.tap</code></td>\n<td>手指点击</td>\n</tr>\n<tr>\n<td><code>page.focus</code></td>\n<td>聚焦</td>\n</tr>\n<tr>\n<td><code>page.hover</code></td>\n<td>hover</td>\n</tr>\n<tr>\n<td><code>page.type</code></td>\n<td>在指定元素中输入内容</td>\n</tr>\n<tr>\n<td><code>page.select</code></td>\n<td>选中 <code>&lt;select&gt;</code> 的某个选项</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E7%AD%89%E5%BE%85">等待<a class="anchor" href="#%E7%AD%89%E5%BE%85">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.waitFor</code></td>\n<td>等待某个元素渲染出来，或者某个函数执行之后返回 <code>true</code>，或者直接等待指定的时间</td>\n</tr>\n<tr>\n<td><code>page.waitForSelector</code></td>\n<td>等待某个元素被渲染</td>\n</tr>\n<tr>\n<td><code>page.waitForFunction</code></td>\n<td>等待某个函数执行之后返回 <code>true</code></td>\n</tr>\n<tr>\n<td><code>page.waitForNavigation</code></td>\n<td>等待页面跳转</td>\n</tr>\n<tr>\n<td><code>page.waitForRequest</code></td>\n<td>等待某个特定的请求被发出</td>\n</tr>\n<tr>\n<td><code>page.waitForResponse</code></td>\n<td>等待某个特定的请求收到了回应</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E6%89%A7%E8%A1%8C%E8%84%9A%E6%9C%AC">执行脚本<a class="anchor" href="#%E6%89%A7%E8%A1%8C%E8%84%9A%E6%9C%AC">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.$</code></td>\n<td>使用 <code>document.querySelector</code> 获取结果，会返回 <code>ElementHandle</code>，可以传递使用</td>\n</tr>\n<tr>\n<td><code>page.$$</code></td>\n<td>同上，不过使用的是 <code>document.querySelectorAll</code></td>\n</tr>\n<tr>\n<td><code>page.$eval</code></td>\n<td>将 <code>document.querySelector</code> 获取的结果传递给 <code>pageFunction</code></td>\n</tr>\n<tr>\n<td><code>page.$$eval</code></td>\n<td>同上，不过使用的是 <code>document.querySelectorAll</code></td>\n</tr>\n<tr>\n<td><code>page.evaluate</code></td>\n<td>直接执行脚本</td>\n</tr>\n<tr>\n<td><code>page.evaluateHandle</code></td>\n<td>执行脚本，返回的是 <code>JSHandle</code>，可以传递使用</td>\n</tr>\n<tr>\n<td><code>page.evaluateOnNewDocument</code></td>\n<td>在下个 frame 执行脚本</td>\n</tr>\n<tr>\n<td><code>page.exposeFunction</code></td>\n<td>将函数注入到 <code>window</code> 对象上</td>\n</tr>\n<tr>\n<td><code>page.queryObjects</code></td>\n<td>获取所有属于这个类的对象，可以传递使用</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC">页面跳转<a class="anchor" href="#%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.goto</code></td>\n<td>跳转页面</td>\n</tr>\n<tr>\n<td><code>page.close</code></td>\n<td>关闭</td>\n</tr>\n<tr>\n<td><code>page.goBack</code></td>\n<td>后退</td>\n</tr>\n<tr>\n<td><code>page.goForward</code></td>\n<td>前进</td>\n</tr>\n<tr>\n<td><code>page.reload</code></td>\n<td>刷新</td>\n</tr>\n<tr>\n<td><code>page.setDefaultNavigationTimeout</code></td>\n<td>设置页面跳转的超时时长</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E8%8E%B7%E5%8F%96%E5%86%85%E5%AE%B9">获取内容<a class="anchor" href="#%E8%8E%B7%E5%8F%96%E5%86%85%E5%AE%B9">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.screenshot</code></td>\n<td>截屏</td>\n</tr>\n<tr>\n<td><code>page.pdf</code></td>\n<td>生成 pdf</td>\n</tr>\n<tr>\n<td><code>page.content</code></td>\n<td>获取整个页面内容</td>\n</tr>\n<tr>\n<td><code>page.title</code></td>\n<td>获取页面 title</td>\n</tr>\n<tr>\n<td><code>page.url</code></td>\n<td>获取页面 url</td>\n</tr>\n<tr>\n<td><code>page.viewport</code></td>\n<td>获取页面 viewport</td>\n</tr>\n<tr>\n<td><code>page.cookies</code></td>\n<td>获取 cookies</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E4%BA%8B%E4%BB%B6">事件<a class="anchor" href="#%E4%BA%8B%E4%BB%B6">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>事件名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.on(\'console\')</code></td>\n<td>监听 <code>console.log</code> 等的调用</td>\n</tr>\n<tr>\n<td><code>page.on(\'dialog\')</code></td>\n<td>监听页面的 <code>alert</code>, <code>beforeunload</code>, <code>confirm</code> 和 <code>prompt</code> 弹窗</td>\n</tr>\n<tr>\n<td><code>page.on(\'load\')</code></td>\n<td>监听页面的加载</td>\n</tr>\n<tr>\n<td><code>page.on(\'domcontentloaded\')</code></td>\n<td>监听页面 dom 加载完成</td>\n</tr>\n<tr>\n<td><code>page.on(\'pageerror\')</code></td>\n<td>监听页面错误</td>\n</tr>\n<tr>\n<td><code>page.on(\'request\')</code></td>\n<td>监听页面发送的请求</td>\n</tr>\n<tr>\n<td><code>page.on(\'requestfailed\')</code></td>\n<td>监听失败的请求</td>\n</tr>\n<tr>\n<td><code>page.on(\'requestfinished\')</code></td>\n<td>监听完成的请求</td>\n</tr>\n<tr>\n<td><code>page.on(\'response\')</code></td>\n<td>监听页面接受到的响应</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">命名空间<a class="anchor" href="#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">§</a></h4>\n<p>通过一些命名空间可以快速访问到该页面下的其他实例。</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>属性名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.keyboard</code></td>\n<td>访问到页面的 Keyboard 对象</td>\n</tr>\n<tr>\n<td><code>page.mouse</code></td>\n<td>访问到页面的 Mouse 对象</td>\n</tr>\n<tr>\n<td><code>page.touchscreen</code></td>\n<td>访问到页面的 TouchScreen 对象</td>\n</tr>\n</tbody>\n</table></div>\n<h2 id="links">Links<a class="anchor" href="#links">§</a></h2>\n<ul>\n<li><a href="https://pptr.dev/">Puppeteer 文档</a></li>\n<li><a href="https://peter.sh/experiments/chromium-command-line-switches/">Chromium CLI 参数</a></li>\n<li><a href="https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js">预设的 EmulateOptions</a></li>\n</ul>'
        } }),
    'head': null,
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/index.js", type: "module" })),
    'contentTitle': React.createElement("h1", { key: "0" }, "Puppeteer \u6307\u5357"),
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<p>Puppeteer 是 Google Chrome 出品的一个无头浏览器。如果你听说过 Phantomjs 或者 Selenium，那么就应该知道它是做什么的了。Puppeteer 与它们类似，提供了一系列 api，通过 DevTools 协议控制 Chromium/Chrome 浏览器的行为。</p>\n<h2 id="%E4%BB%80%E4%B9%88%E6%98%AF%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8">什么是无头浏览器<a class="anchor" href="#%E4%BB%80%E4%B9%88%E6%98%AF%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8">§</a></h2>\n<p>无头浏览器就是没有用户界面的浏览器，即通过写脚本来使用无头浏览器访问网站，还可以做一些点击等行为。</p>\n<p>Puppeteer 一般使用无头的模式运行，这样的开销较小。当然也提供了使用完整的 Chromium/Chrome 来运行的模式。</p>\n<h2 id="puppeteer-%E8%83%BD%E5%81%9A%E4%BB%80%E4%B9%88">Puppeteer 能做什么<a class="anchor" href="#puppeteer-%E8%83%BD%E5%81%9A%E4%BB%80%E4%B9%88">§</a></h2>\n<p>能够做几乎所有浏览器能做的事情。</p>\n<ul>\n<li>网页截图，或生成 pdf</li>\n<li>爬取 SPA 或 SSR 网站</li>\n<li>自动化表单提交，UI测试，键盘输入等</li>\n<li>创建一个最新的自动化测试环境。使用最新的 js 和最新的 Chrome 浏览器运行测试用例</li>\n<li>捕获网站的时间线，帮助诊断性能问题</li>\n<li>测试 Chrome 插件</li>\n</ul>\n<h2 id="puppeteer-%E4%B8%8E%E5%85%B6%E4%BB%96%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB">Puppeteer 与其他无头浏览器有什么区别？<a class="anchor" href="#puppeteer-%E4%B8%8E%E5%85%B6%E4%BB%96%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB">§</a></h2>\n<ul>\n<li>Puppeteer 由 Google Chrome 维护，速度快、安全、稳定、易用</li>\n<li>其他无头浏览器可以支持多种浏览器环境（Safari, Chrome, Firefox 等），而 Puppeteer 只支持 Chromium/Chrome</li>\n<li>Puppeteer 有完善的事件系统，不需要频繁的 <code>sleep(1000)</code> 了</li>\n<li>Puppeteer 的调试功能很强大，还支持在 DevTools 里面调试</li>\n<li>Puppeteer 能够创建一个「真实」的行为，如点击</li>\n</ul>\n<h2 id="%E5%AE%89%E8%A3%85-puppeteer">安装 Puppeteer<a class="anchor" href="#%E5%AE%89%E8%A3%85-puppeteer">§</a></h2>\n<p>先创建一个测试用的项目，执行 <code>npm init</code> 初始化好 <code>package.json</code>，然后执行以下命令安装 Puppeteer：</p>\n<pre class="language-bash"><code class="language-bash"><span class="token function">npm</span> <span class="token function">install</span> puppeteer --save-dev\n</code></pre>\n<p>万事开头难，第一步安装时就会遇到问题（如果没有报错，请跳过这一段）。</p>\n<p>Puppeteer 安装过程中会去下载 Chromium，墙内用户则会报错。如果你看到以下信息，说明是下载 Chromium 时连接不上。</p>\n<pre class="language-bash"><code class="language-bash">ERROR: Failed to download Chromium r588429<span class="token operator">!</span> Set <span class="token string">"PUPPETEER_SKIP_CHROMIUM_DOWNLOAD"</span> <span class="token function">env</span> variable to skip download.\nError: Download failed: server returned code <span class="token number">502</span>. URL: <a class="token url-link" href="https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/588429/chrome-win32.zip">https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/588429/chrome-win32.zip</a>\n</code></pre>\n<p>或者</p>\n<pre class="language-bash"><code class="language-bash">ERROR: Failed to download Chromium r588429<span class="token operator">!</span> Set <span class="token string">"PUPPETEER_SKIP_CHROMIUM_DOWNLOAD"</span> <span class="token function">env</span> variable to skip download.\n<span class="token punctuation">{</span> Error: connect ETIMEDOUT <span class="token number">172.217</span>.24.48:443\n</code></pre>\n<p>如提示所说，设置 <code>PUPPETEER_SKIP_CHROMIUM_DOWNLOAD</code> 可以跳过安装 Chromium。</p>\n<pre class="language-bash"><code class="language-bash"><span class="token assign-left variable">PUPPETEER_SKIP_CHROMIUM_DOWNLOAD</span><span class="token operator">=</span><span class="token number">1</span> <span class="token function">npm</span> <span class="token function">install</span> puppeteer --save-dev\n</code></pre>\n<p>此时可以安装成功，但是使用 Puppeteer 时会由于找不到 Chromium 而报错。可以创建一个文件 <code>test.js</code>，内容如下：</p>\n<pre class="language-js"><code class="language-js"><span class="token keyword">const</span> puppeteer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">\'puppeteer\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">const</span> browser <span class="token operator">=</span> <span class="token keyword control-flow">await</span> puppeteer<span class="token punctuation">.</span><span class="token method function property-access">launch</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">const</span> page <span class="token operator">=</span> <span class="token keyword control-flow">await</span> browser<span class="token punctuation">.</span><span class="token method function property-access">newPage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword control-flow">await</span> page<span class="token punctuation">.</span><span class="token method function property-access">goto</span><span class="token punctuation">(</span><span class="token string">\'<a class="token url-link" href="https://example.com">https://example.com</a>\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword control-flow">await</span> page<span class="token punctuation">.</span><span class="token method function property-access">screenshot</span><span class="token punctuation">(</span><span class="token punctuation">{</span>path<span class="token operator">:</span> <span class="token string">\'example.png\'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n  <span class="token keyword control-flow">await</span> browser<span class="token punctuation">.</span><span class="token method function property-access">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n<p>然后执行 <code>node test.js</code> 则会报错：</p>\n<pre class="language-bash"><code class="language-bash">$ node test.js\n<span class="token punctuation">(</span>node:18368<span class="token punctuation">)</span> UnhandledPromiseRejectionWarning: Unhandled promise rejection <span class="token punctuation">(</span>rejection id: <span class="token number">1</span><span class="token punctuation">)</span>: Error: Chromium revision is not downloaded. Run <span class="token string">"npm install"</span> or <span class="token string">"yarn install"</span>\n<span class="token punctuation">(</span>node:18368<span class="token punctuation">)</span> <span class="token punctuation">[</span>DEP0018<span class="token punctuation">]</span> DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero <span class="token builtin class-name">exit</span> code.\n</code></pre>\n<p>一个解决方案是先手动下载 Chromium，然后在执行时通过配置指定 Chromium 位置，<a href="https://juejin.im/post/5b4a043751882519790c7ad7">这篇文章</a>给出了解决步骤。</p>\n<p>但是我更倾向于还原 Puppeteer 安装时的过程。但是由于一些环境原因，即便翻墙了也只能手动下载 Chromium，无法在安装 Puppeteer 时自动下载 Chromium。</p>\n<p>读了一下源码之后，可以这么解决：</p>\n<ol>\n<li>安装 Puppeteer，安装失败，提示无法下载 <code>https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/588429/chrome-win32.zip</code></li>\n<li>使用 <code>PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=1 npm install puppeteer --save-dev</code> 成功安装 Puppeteer</li>\n<li>执行 <code>node test.js</code> 提示无法找到 Chromium</li>\n<li>手动下载步骤 1 中的 <code>chrome-win32.zip</code>，注意不同版本、不同系统的下载地址是不一样的</li>\n<li>开启一个静态文件服务，使得 <code>http://127.0.0.1:8000/chrome-win32.zip</code> 指向需要下载的文件</li>\n<li>改写 <code>downloadURL</code> 方法，使其直接返回 <code>http://127.0.0.1:8000/chrome-win32.zip</code></li>\n<li>执行 <code>node ./node_modules/puppeteer/install.js</code> 完成安装</li>\n<li>执行 <code>node test.js</code> 测试能否成功生成截图</li>\n</ol>\n<p>至此，成功完成了 Puppeteer 的安装。</p>\n<h2 id="puppeteer-%E7%BB%93%E6%9E%84">Puppeteer 结构<a class="anchor" href="#puppeteer-%E7%BB%93%E6%9E%84">§</a></h2>\n<p>Puppeteer 通过 DevTools 协议控制 Chromium/Chrome 浏览器。它的结构和浏览器结构类似。</p>\n<blockquote>\n<p>下图中淡化显示的可以忽略</p>\n</blockquote>\n<p><img src="../assets/puppeteer_turorial/puppeteer-structure.png" alt="Puppeteer 结构"></p>\n<ul>\n<li>Puppeteer 通过 DevTools 协议控制 Chromium/Chrome 浏览器</li>\n<li>一个浏览器（Browser）实例可以包含多个浏览器上下文（Browser contexts），就像我们打开一个普通的 Chrome 之后又打开一个隐身模式的 Chrome</li>\n<li>一个浏览器上下文（BrowserContext）可以包含多个页面（Pages）</li>\n<li>一个页面（Page）包含至少一个主 frame，也可以包含其他 frames（在主 frame 中通过 iframe 或 frame 标签创建的）</li>\n<li>一个 frame 包含至少一个执行上下文（Execution context），也可以包含其他执行上下文（由 Chrome 插件创建的）</li>\n<li>一个 Workder 包含一个执行上下文，由 WebWorker 创建</li>\n</ul>\n<h2 id="puppeteer-api">Puppeteer API<a class="anchor" href="#puppeteer-api">§</a></h2>\n<p>Puppeteer 的大部分 API 的返回值都是 <code>Promise</code>，故推荐使用 <code>async</code> <code>await</code> 来处理异步操作。Puppeteer 的 API 包含以下类：</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>类名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>Puppeteer</code></td>\n<td>主要用于创建一个浏览器实例，也可以用来下载新的 Chromium，或者设置浏览器的默认参数</td>\n</tr>\n<tr>\n<td><code>BrowserFetcher</code></td>\n<td>用于下载和管理 Chromium</td>\n</tr>\n<tr>\n<td><code>Browser</code></td>\n<td>可以创建一个或多个 Page</td>\n</tr>\n<tr>\n<td><code>BrowserContext</code></td>\n<td>创建一个隐身模式的浏览器时需要用到</td>\n</tr>\n<tr>\n<td><code>Page</code></td>\n<td><strong>主要 API，用于操作一个页面，后面会详细介绍</strong></td>\n</tr>\n<tr>\n<td><code>Worker</code></td>\n<td>用于处理 WebWorker</td>\n</tr>\n<tr>\n<td><code>Keyboard</code></td>\n<td>可以触发键盘按键</td>\n</tr>\n<tr>\n<td><code>Mouse</code></td>\n<td>可以触发鼠标动作</td>\n</tr>\n<tr>\n<td><code>TouchScreen</code></td>\n<td>可以触发触摸屏的动作</td>\n</tr>\n<tr>\n<td><code>Tracing</code></td>\n<td>用于分析性能</td>\n</tr>\n<tr>\n<td><code>Dialog</code></td>\n<td>存在于 page 的 <code>dialog</code> 事件回调中，表示调用弹窗后的对象，包括 <code>alert</code>, <code>beforeunload</code>, <code>confirm</code> 和 <code>prompt</code></td>\n</tr>\n<tr>\n<td><code>ConsoleMessage</code></td>\n<td>存在于 page 的 <code>console</code> 事件回调中，表示调用 <code>console.log</code> 等方法后的对象</td>\n</tr>\n<tr>\n<td><code>Frame</code></td>\n<td>常用于处理包含多个 frame 的页面。page 中的很多方法就是直接调用的主 frame 的方法</td>\n</tr>\n<tr>\n<td><code>ExecutionContext</code></td>\n<td>执行上下文存在于 frame、浏览器插件、worker 中。可以用来直接执行一段 js</td>\n</tr>\n<tr>\n<td><code>JSHandle</code></td>\n<td>通过 <code>page.evaluateHandle</code> 生成，用于将页面中的 handler 挑出来传递使用</td>\n</tr>\n<tr>\n<td><code>ElementHandle</code></td>\n<td>通过 <code>page.$</code> 生成，用于将页面中某个元素的 handler 挑出来传递使用</td>\n</tr>\n<tr>\n<td><code>Request</code></td>\n<td>在 <code>page.setRequestInterception</code> 方法中使用，可以处理页面的请求</td>\n</tr>\n<tr>\n<td><code>Response</code></td>\n<td>表示页面接收到的响应</td>\n</tr>\n<tr>\n<td><code>SecurityDetails</code></td>\n<td>表示页面的安全信息</td>\n</tr>\n<tr>\n<td><code>Target</code></td>\n<td>可以是 page, background_page, service_worker, browser 等</td>\n</tr>\n<tr>\n<td><code>CDPSession</code></td>\n<td>用于直接和 Devtools 通信</td>\n</tr>\n<tr>\n<td><code>Coverage</code></td>\n<td>用于分析 js 和 css 的代码被页面使用的比例</td>\n</tr>\n<tr>\n<td><code>TimeoutError</code></td>\n<td>超时错误</td>\n</tr>\n</tbody>\n</table></div>\n<h3 id="page">Page<a class="anchor" href="#page">§</a></h3>\n<p>Page 是 Puppeteer 中最重要的一个 API，也是它的核心所在，这里会介绍一些常用的 Page API。</p>\n<h4 id="%E8%AE%BE%E7%BD%AE%E9%A1%B5%E9%9D%A2%E7%8E%AF%E5%A2%83">设置页面环境<a class="anchor" href="#%E8%AE%BE%E7%BD%AE%E9%A1%B5%E9%9D%A2%E7%8E%AF%E5%A2%83">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.emulate</code></td>\n<td>设置 viewport 和 ua</td>\n</tr>\n<tr>\n<td><code>page.setViewport</code></td>\n<td>设置 viewport</td>\n</tr>\n<tr>\n<td><code>page.setUserAgent</code></td>\n<td>设置 ua</td>\n</tr>\n<tr>\n<td><code>page.setRequestInterception</code></td>\n<td><strong>中断所有请求，并可以修改请求的返回值</strong></td>\n</tr>\n<tr>\n<td><code>page.addScriptTag</code></td>\n<td>添加 js 脚本</td>\n</tr>\n<tr>\n<td><code>page.addStyleTag</code></td>\n<td>添加 css</td>\n</tr>\n<tr>\n<td><code>page.setContent</code></td>\n<td>设置整个 html</td>\n</tr>\n<tr>\n<td><code>page.setCacheEnabled</code></td>\n<td>设置缓存是否开启</td>\n</tr>\n<tr>\n<td><code>page.setExtraHTTPHeaders</code></td>\n<td>设置额外的 http 头</td>\n</tr>\n<tr>\n<td><code>page.setGeolocation</code></td>\n<td>设置地理位置</td>\n</tr>\n<tr>\n<td><code>page.setJavaScriptEnabled</code></td>\n<td>设置 js 是否开启</td>\n</tr>\n<tr>\n<td><code>page.setOfflineMode</code></td>\n<td>设置离线模式</td>\n</tr>\n<tr>\n<td><code>page.deleteCookie</code></td>\n<td>删除 cookies</td>\n</tr>\n<tr>\n<td><code>page.setCookie</code></td>\n<td>设置 cookies</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E6%A8%A1%E6%8B%9F%E5%8A%A8%E4%BD%9C">模拟动作<a class="anchor" href="#%E6%A8%A1%E6%8B%9F%E5%8A%A8%E4%BD%9C">§</a></h4>\n<p>一般会先滚动视窗到相应元素那，再执行动作。</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.click</code></td>\n<td>点击</td>\n</tr>\n<tr>\n<td><code>page.tap</code></td>\n<td>手指点击</td>\n</tr>\n<tr>\n<td><code>page.focus</code></td>\n<td>聚焦</td>\n</tr>\n<tr>\n<td><code>page.hover</code></td>\n<td>hover</td>\n</tr>\n<tr>\n<td><code>page.type</code></td>\n<td>在指定元素中输入内容</td>\n</tr>\n<tr>\n<td><code>page.select</code></td>\n<td>选中 <code>&lt;select&gt;</code> 的某个选项</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E7%AD%89%E5%BE%85">等待<a class="anchor" href="#%E7%AD%89%E5%BE%85">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.waitFor</code></td>\n<td>等待某个元素渲染出来，或者某个函数执行之后返回 <code>true</code>，或者直接等待指定的时间</td>\n</tr>\n<tr>\n<td><code>page.waitForSelector</code></td>\n<td>等待某个元素被渲染</td>\n</tr>\n<tr>\n<td><code>page.waitForFunction</code></td>\n<td>等待某个函数执行之后返回 <code>true</code></td>\n</tr>\n<tr>\n<td><code>page.waitForNavigation</code></td>\n<td>等待页面跳转</td>\n</tr>\n<tr>\n<td><code>page.waitForRequest</code></td>\n<td>等待某个特定的请求被发出</td>\n</tr>\n<tr>\n<td><code>page.waitForResponse</code></td>\n<td>等待某个特定的请求收到了回应</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E6%89%A7%E8%A1%8C%E8%84%9A%E6%9C%AC">执行脚本<a class="anchor" href="#%E6%89%A7%E8%A1%8C%E8%84%9A%E6%9C%AC">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.$</code></td>\n<td>使用 <code>document.querySelector</code> 获取结果，会返回 <code>ElementHandle</code>，可以传递使用</td>\n</tr>\n<tr>\n<td><code>page.$$</code></td>\n<td>同上，不过使用的是 <code>document.querySelectorAll</code></td>\n</tr>\n<tr>\n<td><code>page.$eval</code></td>\n<td>将 <code>document.querySelector</code> 获取的结果传递给 <code>pageFunction</code></td>\n</tr>\n<tr>\n<td><code>page.$$eval</code></td>\n<td>同上，不过使用的是 <code>document.querySelectorAll</code></td>\n</tr>\n<tr>\n<td><code>page.evaluate</code></td>\n<td>直接执行脚本</td>\n</tr>\n<tr>\n<td><code>page.evaluateHandle</code></td>\n<td>执行脚本，返回的是 <code>JSHandle</code>，可以传递使用</td>\n</tr>\n<tr>\n<td><code>page.evaluateOnNewDocument</code></td>\n<td>在下个 frame 执行脚本</td>\n</tr>\n<tr>\n<td><code>page.exposeFunction</code></td>\n<td>将函数注入到 <code>window</code> 对象上</td>\n</tr>\n<tr>\n<td><code>page.queryObjects</code></td>\n<td>获取所有属于这个类的对象，可以传递使用</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC">页面跳转<a class="anchor" href="#%E9%A1%B5%E9%9D%A2%E8%B7%B3%E8%BD%AC">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.goto</code></td>\n<td>跳转页面</td>\n</tr>\n<tr>\n<td><code>page.close</code></td>\n<td>关闭</td>\n</tr>\n<tr>\n<td><code>page.goBack</code></td>\n<td>后退</td>\n</tr>\n<tr>\n<td><code>page.goForward</code></td>\n<td>前进</td>\n</tr>\n<tr>\n<td><code>page.reload</code></td>\n<td>刷新</td>\n</tr>\n<tr>\n<td><code>page.setDefaultNavigationTimeout</code></td>\n<td>设置页面跳转的超时时长</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E8%8E%B7%E5%8F%96%E5%86%85%E5%AE%B9">获取内容<a class="anchor" href="#%E8%8E%B7%E5%8F%96%E5%86%85%E5%AE%B9">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>方法名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.screenshot</code></td>\n<td>截屏</td>\n</tr>\n<tr>\n<td><code>page.pdf</code></td>\n<td>生成 pdf</td>\n</tr>\n<tr>\n<td><code>page.content</code></td>\n<td>获取整个页面内容</td>\n</tr>\n<tr>\n<td><code>page.title</code></td>\n<td>获取页面 title</td>\n</tr>\n<tr>\n<td><code>page.url</code></td>\n<td>获取页面 url</td>\n</tr>\n<tr>\n<td><code>page.viewport</code></td>\n<td>获取页面 viewport</td>\n</tr>\n<tr>\n<td><code>page.cookies</code></td>\n<td>获取 cookies</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E4%BA%8B%E4%BB%B6">事件<a class="anchor" href="#%E4%BA%8B%E4%BB%B6">§</a></h4>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>事件名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.on(\'console\')</code></td>\n<td>监听 <code>console.log</code> 等的调用</td>\n</tr>\n<tr>\n<td><code>page.on(\'dialog\')</code></td>\n<td>监听页面的 <code>alert</code>, <code>beforeunload</code>, <code>confirm</code> 和 <code>prompt</code> 弹窗</td>\n</tr>\n<tr>\n<td><code>page.on(\'load\')</code></td>\n<td>监听页面的加载</td>\n</tr>\n<tr>\n<td><code>page.on(\'domcontentloaded\')</code></td>\n<td>监听页面 dom 加载完成</td>\n</tr>\n<tr>\n<td><code>page.on(\'pageerror\')</code></td>\n<td>监听页面错误</td>\n</tr>\n<tr>\n<td><code>page.on(\'request\')</code></td>\n<td>监听页面发送的请求</td>\n</tr>\n<tr>\n<td><code>page.on(\'requestfailed\')</code></td>\n<td>监听失败的请求</td>\n</tr>\n<tr>\n<td><code>page.on(\'requestfinished\')</code></td>\n<td>监听完成的请求</td>\n</tr>\n<tr>\n<td><code>page.on(\'response\')</code></td>\n<td>监听页面接受到的响应</td>\n</tr>\n</tbody>\n</table></div>\n<h4 id="%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">命名空间<a class="anchor" href="#%E5%91%BD%E5%90%8D%E7%A9%BA%E9%97%B4">§</a></h4>\n<p>通过一些命名空间可以快速访问到该页面下的其他实例。</p>\n<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>属性名</th>\n<th>描述</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td><code>page.keyboard</code></td>\n<td>访问到页面的 Keyboard 对象</td>\n</tr>\n<tr>\n<td><code>page.mouse</code></td>\n<td>访问到页面的 Mouse 对象</td>\n</tr>\n<tr>\n<td><code>page.touchscreen</code></td>\n<td>访问到页面的 TouchScreen 对象</td>\n</tr>\n</tbody>\n</table></div>\n<h2 id="links">Links<a class="anchor" href="#links">§</a></h2>\n<ul>\n<li><a href="https://pptr.dev/">Puppeteer 文档</a></li>\n<li><a href="https://peter.sh/experiments/chromium-command-line-switches/">Chromium CLI 参数</a></li>\n<li><a href="https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js">预设的 EmulateOptions</a></li>\n</ul>'
        } }),
    'toc': React.createElement("aside", { dangerouslySetInnerHTML: {
            __html: '<nav class="toc"><ol><li><a href="#%E4%BB%80%E4%B9%88%E6%98%AF%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8">什么是无头浏览器</a></li><li><a href="#puppeteer-%E8%83%BD%E5%81%9A%E4%BB%80%E4%B9%88">Puppeteer 能做什么</a></li><li><a href="#puppeteer-%E4%B8%8E%E5%85%B6%E4%BB%96%E6%97%A0%E5%A4%B4%E6%B5%8F%E8%A7%88%E5%99%A8%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB">Puppeteer 与其他无头浏览器有什么区别？</a></li><li><a href="#%E5%AE%89%E8%A3%85-puppeteer">安装 Puppeteer</a></li><li><a href="#puppeteer-%E7%BB%93%E6%9E%84">Puppeteer 结构</a></li><li><a href="#puppeteer-api">Puppeteer API</a><ol><li><a href="#page">Page</a><ol></ol></li></ol></li><li><a href="#links">Links</a></li></ol></nav>'
        } }),
    'author': "xcatliu",
    'contributors': [
        "xcatliu"
    ],
    'date': "2018-09-18T00:00:00.000Z",
    'updated': "2020-11-07T02:33:59.000Z",
    'excerpt': "Puppeteer 是 Google Chrome 出品的一个无头浏览器。如果你听说过 Phantomjs 或者 Selenium，那么就应该知道它是做什么的了。Puppeteer 与它们类似，提供了一系列 api，通过 DevTools 协议控制 Chromium/Chrome 浏览器的行为。...",
    'cover': "../assets/puppeteer_turorial/puppeteer-structure.png",
    'categories': [
        "编程世界"
    ],
    'tags': [
        "JavaScript",
        "Puppeteer"
    ],
    'blog': {
        "isPost": true,
        "posts": [
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
                "count": 47
            },
            {
                "name": "多彩生活",
                "count": 7
            }
        ]
    }
};

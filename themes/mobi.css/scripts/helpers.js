/* global hexo */
/* eslint strict:0 */

'use strict';

hexo.extend.helper.register('url_for_lang', function (path) {
  if (!this.page.lang) return this.url_for(path);
  /**
   * `this.config.language` includes a `default` language,
   * If we set only one language, the length will be 2
   */
  if (!this.config.language || this.config.language.length < 3) return this.url_for(path);

  const currentLang = this.page.lang;
  const defaultLang = this.config.language[0];

  let url = this.url_for(path);

  if (currentLang !== defaultLang && url[0] === '/') url = `/${currentLang}${url}`;

  return url;
});

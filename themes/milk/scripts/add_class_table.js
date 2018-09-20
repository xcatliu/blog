/* global hexo */

hexo.extend.filter.register('after_post_render', (data) => {
  data.content = data.content.replace(/<table>/, '<table class="table">');
  return data;
});
/* global hexo */

hexo.extend.filter.register('after_post_render', (data) => {
  data.content = data.content.replace(/<table>/g, '<table class="table">');
  return data;
});
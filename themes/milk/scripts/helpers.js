/* global hexo */

hexo.extend.helper.register('____', function (target) {
  if (typeof target === 'string') {
    return target;
  }
  if (typeof target.__ === 'string') {
    return this.__(target.__);
  }
  return '';
});

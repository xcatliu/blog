export default {
  srcDir: 'src',
  theme: 'blog',
  plugins: ['blog'],
  title: '流浪小猫的博客',
  description: '欢迎来到我的博客，这里搜集了我的技术文章和生活感悟，欢迎一起交流成长。',
  github: 'https://github.com/xcatliu/blog',
  nav: [
    {
      text: '首页',
      link: '/',
      icon: 'czs-home-l'
    },
    {
      text: '分类',
      link: '/categories/',
      icon: 'czs-category-l'
    },
    {
      text: '标签',
      link: '/tags/',
      icon: 'czs-tag-l'
    },
    {
      text: '关于',
      link: '/about/',
      icon: 'czs-about-l'
    },
    {
      text: '归档',
      link: '/archives/',
      icon: 'czs-box-l'
    },
    {
      text: '友情链接',
      link: '/links/',
      icon: 'czs-link-l'
    }
  ],
  blog: {
    root: '/posts/',
    social: {
      github: 'xcatliu/blog',
      email: 'xcatliu@gmail.com',
      twitter: 'xcatliu',
    }
  }
};

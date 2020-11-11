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
            icon: 'home'
        },
        {
            text: '分类',
            link: '/categories/',
            icon: 'category'
        },
        {
            text: '标签',
            link: '/tags/',
            icon: 'tag'
        },
        {
            text: '关于',
            link: '/about/',
            icon: 'about'
        },
        {
            text: '归档',
            link: '/archives/',
            icon: 'box'
        },
        {
            text: '友情链接',
            link: '/links/',
            icon: 'link'
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

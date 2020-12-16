import { classnames } from './_utils.js';
const SOCIAL_MAP = {
    github: {
        icon: 'czs-github-logo',
        linkPrefix: 'https://github.com/',
    },
    email: {
        icon: 'czs-message-l',
        linkPrefix: 'mailto:',
    },
    twitter: {
        icon: 'czs-twitter',
        linkPrefix: 'https://twitter.com/',
    },
    v2ex: {
        icon: 'czs-v2ex',
        linkPrefix: 'https://v2ex.com/member/',
    },
    zhihu: {
        icon: 'czs-zhihu',
        linkPrefix: 'https://www.zhihu.com/people/',
    },
};
const Aside = ({ config, isDark, setIsDark, outputPath }) => {
    var _a, _b, _c;
    return (React.createElement(React.Fragment, null,
        React.createElement("a", { className: "czs-menu-l show_on_mobile aside_button_open", href: "#", style: { backgroundImage: `url("${config.root}assets/czs-menu-l.svg")` }, onClick: (e) => {
                e.preventDefault();
                // @ts-ignore
                document.documentElement.classList.add('show_aside');
            } }),
        React.createElement("a", { className: "show_on_mobile aside_button_text", href: config.root }, config.title),
        React.createElement("aside", { className: "hide_on_mobile" },
            React.createElement("a", { className: "czs-menu-l show_on_mobile aside_button_close", href: "#", style: { backgroundImage: `url("${config.root}assets/czs-close-l.svg")` }, onClick: (e) => {
                    e.preventDefault();
                    // @ts-ignore
                    document.documentElement.classList.remove('show_aside');
                } }),
            React.createElement("h1", null,
                React.createElement("a", { href: config.root, onClick: () => {
                        // @ts-ignore
                        document.documentElement.classList.remove('show_aside');
                    } }, config.title)),
            React.createElement("p", { className: "description" }, config.description),
            React.createElement("ul", { className: "social list_style_none" },
                Object.entries((_b = (_a = config.blog) === null || _a === void 0 ? void 0 : _a.social) !== null && _b !== void 0 ? _b : {}).map(([key, user]) => (React.createElement("li", { key: key, className: "flex_center" },
                    React.createElement("a", { className: SOCIAL_MAP[key].icon, href: `${SOCIAL_MAP[key].linkPrefix}${user}`, target: "_blank", style: { backgroundImage: `url("${config.root}assets/${SOCIAL_MAP[key].icon}.svg")` }, onClick: () => {
                            // @ts-ignore
                            document.documentElement.classList.remove('show_aside');
                        } })))),
                React.createElement("li", { style: { flexGrow: 1 } }),
                React.createElement("li", { onClick: () => {
                        setIsDark(!isDark);
                        // @ts-ignore
                        document.cookie = `is_dark=${!isDark ? '1' : '0'}; expires=Tue, 19 Jun 2038 03:14:07 UTC; path=/`;
                        // @ts-ignore
                        document.documentElement.classList.remove('show_aside');
                    }, className: "toggle_dark flex_center" },
                    React.createElement("span", { className: "czs-sun", style: { backgroundImage: `url("${config.root}assets/czs-sun.svg")` } }),
                    React.createElement("span", { className: "czs-sun-l", style: { backgroundImage: `url("${config.root}assets/czs-sun-l.svg")` } }),
                    React.createElement("span", { className: "czs-moon", style: { backgroundImage: `url("${config.root}assets/czs-moon.svg")` } }),
                    React.createElement("span", { className: "czs-moon-l", style: { backgroundImage: `url("${config.root}assets/czs-moon-l.svg")` } }))),
            React.createElement("nav", null,
                React.createElement("ul", { className: "menu list_style_none" }, (_c = config.nav) === null || _c === void 0 ? void 0 : _c.map(({ text, link, icon, target }) => (React.createElement("li", { key: link },
                    React.createElement("a", { className: classnames('flex_center', {
                            active: outputPath === 'index.html' ? link === '/' : link !== '/' && `/${outputPath}`.startsWith(link),
                        }), href: link, target: target, onClick: () => {
                            // @ts-ignore
                            document.documentElement.classList.remove('show_aside');
                        } },
                        React.createElement("span", { className: icon, style: { backgroundImage: `url("${config.root}assets/${icon}.svg")` } }),
                        text)))))))));
};
export default Aside;

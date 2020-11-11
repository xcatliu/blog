import LayoutBase from '../_layout_base.js';
import { dateFormatter } from '../_utils.js';
const Archives = (props) => {
    const { config, contentTitle, title, blog } = props;
    return (React.createElement("section", { className: "main" }, contentTitle !== null && contentTitle !== void 0 ? contentTitle : (title && React.createElement("h1", null, title)),
        React.createElement("ul", { className: "main_archives" }, blog === null || blog === void 0 ? void 0 : blog.posts.map(({ title, link, date }) => (React.createElement("li", { key: link },
            React.createElement("time", { dateTime: date.toString() }, dateFormatter['YYYY-MM-DD'](date)),
            React.createElement("div", null,
                React.createElement("a", { href: `${config.root}${link}` }, title))))))));
};
const Layout = (props) => React.createElement(LayoutBase, Object.assign({}, props, { Main: Archives }));
export default Layout;

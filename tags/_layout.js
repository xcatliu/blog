import LayoutBase from '../_layout_base.js';
const Tags = (props) => {
    const { contentTitle, title, blog, config } = props;
    return (React.createElement("section", { className: "main" }, contentTitle !== null && contentTitle !== void 0 ? contentTitle : (title && React.createElement("h1", null, title)),
        React.createElement("ul", { className: "main_tags list_style_none" }, blog === null || blog === void 0 ? void 0 : blog.tags.map(({ name, count }) => (React.createElement("li", { key: name },
            React.createElement("a", { href: `${config.root}tags/${name}/`, style: {
                    fontSize: 16 + Math.floor(Math.log(count) / Math.log(1.2)),
                } },
                name,
                " (",
                count,
                ")")))))));
};
const Layout = (props) => React.createElement(LayoutBase, Object.assign({}, props, { Main: Tags }));
export default Layout;

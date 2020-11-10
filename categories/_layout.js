import LayoutBase from '../_layout_base.js';
const Categories = (props) => {
    var _a, _b;
    return (React.createElement("section", { className: "main" }, (_a = props.contentTitle) !== null && _a !== void 0 ? _a : (props.title && React.createElement("h1", null, props.title)),
        React.createElement("ul", { className: "main_categories" }, (_b = props.blog) === null || _b === void 0 ? void 0 : _b.categories.map(({ name, count }) => (React.createElement("li", { key: name },
            React.createElement("a", { href: `${props.config.root}categories/${name}/` },
                name,
                " (",
                count,
                ")")))))));
};
const Layout = (props) => React.createElement(LayoutBase, Object.assign({}, props, { Main: Categories }));
export default Layout;

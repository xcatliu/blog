import { dateFormatter } from '../_utils.js';
const Posts = (props) => {
    const { config, contentTitle, title, blog } = props;
    return (React.createElement("section", { className: "main" },
        React.createElement("article", null, contentTitle !== null && contentTitle !== void 0 ? contentTitle : (title && React.createElement("h1", null, title)),
            React.createElement("ul", { className: "main_posts list_style_none" }, blog === null || blog === void 0 ? void 0 : blog.posts.map(({ title, link, date, author, categories, excerpt, cover }) => (React.createElement("li", { key: link },
                cover && (React.createElement("div", { className: "main_posts_cover", style: {
                        backgroundImage: `url("${cover}")`,
                    } })),
                React.createElement("h1", null,
                    React.createElement("a", { href: `${config.root}${link}` }, title)),
                excerpt && React.createElement("p", null, excerpt),
                React.createElement("div", { className: "main_posts_meta" },
                    React.createElement("time", { dateTime: date.toString() }, dateFormatter['YYYY-MM-DD'](date)),
                    author && React.createElement(React.Fragment, null,
                        "\u00A0\u00B7\u00A0",
                        author),
                    (categories === null || categories === void 0 ? void 0 : categories[0]) && (React.createElement(React.Fragment, null,
                        "\u00A0\u00B7\u00A0",
                        React.createElement("a", { href: `${config.root}categories/${categories[0]}/` }, categories[0])))))))))));
};
export default Posts;

import Loading from './_loading.js';
import { dateFormatter } from './_utils.js';
const Main = (props) => {
    const { config, content, contentTitle, contentBody, blog, author, date, loading } = props;
    return (React.createElement("section", { className: "main" }, loading ? (React.createElement(Loading, null)) : (blog === null || blog === void 0 ? void 0 : blog.isPost) ? (React.createElement(React.Fragment, null,
        contentTitle,
        date && (React.createElement("div", { className: "main_post_meta" },
            React.createElement("time", { dateTime: date.toString() }, dateFormatter['YYYY-MM-DD'](date)),
            " \u00B7 ", author !== null && author !== void 0 ? author : 'unknown')),
        contentBody)) : (content)));
};
export default Main;

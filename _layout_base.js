import Head from './_head.js';
import Aside from './_aside.js';
import Footer from './_footer.js';
import { classnames } from './_utils.js';
const LayoutBase = (props) => {
    const [isDark, setIsDark] = React.useState(
    // @ts-ignore
    window.Deno ? false : document.documentElement.classList.contains('is_dark'));
    return (React.createElement("html", { className: classnames({ is_dark: isDark }) },
        React.createElement(Head, Object.assign({}, props, { isDark: isDark })),
        React.createElement("body", null,
            React.createElement(Aside, Object.assign({}, props, { isDark: isDark, setIsDark: setIsDark })),
            React.createElement(props.Main, Object.assign({}, props)),
            React.createElement(Footer, Object.assign({}, props)),
            props.script)));
};
export default LayoutBase;

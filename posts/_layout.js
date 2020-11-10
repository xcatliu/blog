import LayoutBase from '../_layout_base.js';
import Main from '../_main.js';
import Posts from './_posts.js';
const Layout = (props) => { var _a; return React.createElement(LayoutBase, Object.assign({}, props, { Main: ((_a = props.blog) === null || _a === void 0 ? void 0 : _a.isPost) ? Main : Posts })); };
export default Layout;

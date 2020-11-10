import LayoutBase from './_layout_base.js';
import Main from './_main.js';
import Posts from './posts/_posts.js';
const Layout = (props) => (React.createElement(LayoutBase, Object.assign({}, props, { Main: props.outputPath === 'index.html' ? Posts : Main })));
export default Layout;

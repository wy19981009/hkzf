import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// 导入antd-mobile的样式
import 'antd-mobile/dist/antd-mobile.css';
// 导入字体图标样式
import './assets/fonts/iconfont.css'
// 导入自己的样式
import './index.css';



/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

ReactDOM.render(<App />, document.getElementById('root'))

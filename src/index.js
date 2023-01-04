import React from "react";
import ReactDOM from "react-dom";

// 导入antd-mobile的样式
// import "antd-mobile/dist/antd-mobile.css";
// 导入字体图标样式
import "./assets/fonts/iconfont.css";

// 导入react-virtualized组件的样式
import "react-virtualized/styles.css";

/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

import App from "./App";
// 导入自己的样式
import "./index.css";

ReactDOM.render(<App />, document.getElementById("root"));

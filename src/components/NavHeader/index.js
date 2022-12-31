import React from "react";

import { NavBar } from "antd-mobile";

// 导入withRouter高阶组件
import { withRouter } from "react-router-dom";

import './index.scss'


function NavHeader({ children, history, onLeftClick }) {
    // 默认点击行为
    const defaultHandler = () => history.go(-1);
    return (
        <NavBar
            className='navBar'
            mode='light'
            icon={<i className='iconfont icon-back' />}
            onLeftClick={onLeftClick || defaultHandler}
        >
            {children}
        </NavBar>
    )
}

// withRouter的返回值也是一个组件
export default withRouter(NavHeader);
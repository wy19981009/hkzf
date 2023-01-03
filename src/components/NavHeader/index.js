import React from "react";

import { NavBar } from "antd-mobile";

// 导入withRouter高阶组件
import { withRouter } from "react-router-dom";

// 导入props校验
import PropTypes from "prop-types";

// import './index.scss'
import styles from "./index.module.css";

function NavHeader({
	children,
	history,
	onLeftClick,
	className,
	rightContent,
}) {
	// 默认点击行为
	const defaultHandler = () => history.go(-1);
	return (
		<NavBar
			className={[styles.navBar, className || ""].join(" ")}
			mode='light'
			icon={<i className='iconfont icon-back' />}
			onLeftClick={onLeftClick || defaultHandler}
			rightContent={rightContent}
		>
			{children}
		</NavBar>
	);
}

NavHeader.propTypes = {
	children: PropTypes.string.isRequired,
	onLeftClick: PropTypes.func,
	className: PropTypes.string,
	rightContent: PropTypes.array,
};

// withRouter的返回值也是一个组件
export default withRouter(NavHeader);

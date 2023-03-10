import React from "react";

import { Flex } from "antd-mobile";

import PropTypes from "prop-types";

import styles from "./index.module.css";

function FilterFooter({
	cancelText = "取消",
	okText = "确定",
	onCancel,
	onOK,
	className,
}) {
	return (
		<Flex className={[styles.root, className || ""]}>
			{/* 取消按钮 */}
			<span
				className={[styles.btn, styles.cancel].join(" ")}
				onClick={onCancel}
			>
				{cancelText}
			</span>
			{/* 确定按钮 */}
			<span className={[styles.btn, styles.ok].join(" ")} onClick={onOK}>
				{okText}
			</span>
		</Flex>
	);
}

// props校验
FilterFooter.prototype = {
	cancelText: PropTypes.string,
	okText: PropTypes.string,
	onCancel: PropTypes.func,
	onOK: PropTypes.func,
	className: PropTypes.string,
};

export default FilterFooter;

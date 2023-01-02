import React from "react";

import { Flex } from "antd-mobile";

// 导入搜索导航栏组件
import SearchHeader from "../../components/SearchHeader";

import Filter from "./components/Filter";

import styles from "./index.module.css";

// 获取当前城市定位信息
const { label } = JSON.parse(localStorage.getItem("hkzf_city"));

export default class HouseList extends React.Component {
	render() {
		return (
			<div>
				{/* 顶部搜索导航 */}
				<Flex className={styles.header}>
					<i
						className='iconfont icon-back'
						onClick={() => this.props.history.go(-1)}
					></i>
					<SearchHeader cityName={label} className={styles.searchHeader} />
				</Flex>

				{/* 条件筛选栏 */}
				<Filter />
			</div>
		);
	}
}

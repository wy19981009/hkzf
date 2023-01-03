import React from "react";

import { Flex } from "antd-mobile";

import { API } from "../../utils/api";

// 导入搜索导航栏组件
import SearchHeader from "../../components/SearchHeader";

import { List, AutoSizer } from "react-virtualized";

import HouseItem from "../../components/HouseItem";

import Filter from "./components/Filter";

import styles from "./index.module.css";

import { BASE_URL } from "../../utils/url";

// 获取当前城市定位信息
const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));

export default class HouseList extends React.Component {
	state = {
		// 列表数据
		list: [],
		// 总条数
		count: 0,
	};
	// 初始化实例属性
	filters = {};

	componentDidMount() {
		this.searchHouseList();
	}
	// 用来获取房屋列表数据
	async searchHouseList() {
		// 获取当前定位城市id
		// const { value } = JSON.parse(localStorage.getItem("hkzf_city"));
		const res = await API.get("/houses", {
			params: {
				cityId: value,
				...this.filters,
				start: 1,
				end: 20,
			},
		});
		// console.log(res);
		const { count, list } = res.data.body;
		this.setState({
			list,
			count,
		});
	}
	// 接收Filter组件中的条件数据
	onFilter = (filters) => {
		this.filters = filters;
		// console.log(this.filters);
		this.searchHouseList();
	};

	renderHouseList = ({
		key, // Unique key within array of rows
		index, // 索引号
		style, // 必须的，一定要添加该样式
	}) => {
		// 根据索引号来获取当前这一行的房屋数据
		const { list } = this.state;
		const house = list[index];
		// console.log(house);
		return (
			<HouseItem
				key={key}
				style={style}
				src={BASE_URL + house.houseImg}
				title={house.title}
				desc={house.desc}
				tags={house.tags}
				price={house.price}
			/>
		);
	};

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
				<Filter onFilter={this.onFilter} />

				{/* 房屋列表 */}
				<div className={styles.houseItems}>
					<List
						height={300}
						rowCount={this.state.count}
						rowHeight={120}
						rowRenderer={this.renderHouseList}
						width={300}
					/>
				</div>
			</div>
		);
	}
}

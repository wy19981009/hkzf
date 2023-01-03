import React from "react";

import { Flex } from "antd-mobile";

import { API } from "../../utils/api";

// 导入搜索导航栏组件
import SearchHeader from "../../components/SearchHeader";

import {
	List,
	AutoSizer,
	WindowScroller,
	InfiniteLoader,
} from "react-virtualized";

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

		// 判断house是否存在，如果不存在就渲染loading元素占位
		if (!house) {
			return (
				<div key={key} style={style}>
					<p className={styles.loading}></p>
				</div>
			);
		}
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

	// 判断每一行是否加载完成
	isRowLoaded = ({ index }) => {
		return !!this.state.list[index];
	};

	// 用来获取更多房屋列表数据
	loadMoreRows = ({ startIndex, stopIndex }) => {
		// return fetch(
		// 	`/path/to/api?startIndex=${startIndex}&stopIndex=${stopIndex}`,
		// );
		// console.log(startIndex, stopIndex);
		return new Promise((resolve) => {
			API.get("/houses", {
				params: {
					cityId: value,
					...this.filters,
					start: startIndex,
					end: stopIndex,
				},
			}).then((res) => {
				// console.log(res);
				this.setState({
					list: [...this.state.list, ...res.data.body.list],
				});
				// 数据加载完成时，调用resolve方法
				resolve();
			});
		});
	};

	render() {
		const { count } = this.state;
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
					<InfiniteLoader
						isRowLoaded={this.isRowLoaded}
						loadMoreRows={this.loadMoreRows}
						rowCount={count}
					>
						{({ onRowsRendered, registerChild }) => (
							<WindowScroller>
								{({ height, isScrolling, scrollTop }) => (
									<AutoSizer>
										{({ width }) => (
											<List
												onRowsRendered={onRowsRendered}
												ref={registerChild}
												autoHeight
												height={height}
												rowCount={count}
												rowHeight={120}
												rowRenderer={this.renderHouseList}
												width={width}
												isScrolling={isScrolling}
												scrollTop={scrollTop}
											/>
										)}
									</AutoSizer>
								)}
							</WindowScroller>
						)}
					</InfiniteLoader>
				</div>
			</div>
		);
	}
}

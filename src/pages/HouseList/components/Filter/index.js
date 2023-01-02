import React, { Component } from "react";

import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import FilterMore from "../FilterMore";

// 导入自定义axios
import { API } from "../../../../utils/api";

import styles from "./index.module.css";

// 标题高亮状态，true表示高亮，false表示不高亮
const titleSelectedStatus = {
	area: false,
	mode: false,
	price: false,
	more: false,
};

const selectedValues = {
	area: ["area", "null"],
	mode: ["null"],
	price: ["null"],
	more: [],
};

export default class Filter extends Component {
	state = {
		titleSelectedStatus,
		openType: " ",

		// 所有筛选条件数据
		filtersData: {},
		// 默认选中值
		selectedValues,
	};

	componentDidMount() {
		this.getFiltersData();
	}

	// 封装获取所有筛选条件的方法
	async getFiltersData() {
		// 获取当前定位城市id
		const { value } = JSON.parse(localStorage.getItem("hkzf_city"));
		const res = await API.get(`/houses/condition?id=${value}`);
		// console.log(res);
		this.setState({
			filtersData: res.data.body,
		});
	}

	// 点击标题菜单实现高亮
	// 注意this指向问题，使用箭头函数解决
	onTitleClick = (type) => {
		// console.log(this, type);
		this.setState((prevState) => {
			return {
				titleSelectedStatus: {
					...prevState.titleSelectedStatus,
					[type]: true,
				},
				// 展示对话框
				openType: type,
			};
		});
	};

	// 取消(隐藏)对话框
	onCancel = () => {
		this.setState({
			openType: "",
		});
	};

	// 确定(隐藏对话框)
	onSave = (type, value) => {
		// console.log(type, value);
		this.setState({
			openType: "",

			selectedValues: {
				...this.state.selectedValues,
				// 值更新
				[type]: value,
			},
		});
	};

	// 渲染FilterPicker组件的方法
	renderFilterPicker() {
		const {
			openType,
			filtersData: { area, subway, rentType, price },
			selectedValues,
		} = this.state;
		if (openType !== "area" && openType !== "mode" && openType !== "price") {
			return null;
		}

		// 根据openType拿到当前筛选数据源
		let data = [];
		let cols = 3;
		let defaultValue = selectedValues[openType];
		switch (openType) {
			case "area":
				// 获取到区域数据
				data = [area, subway];
				cols = 3;
				break;
			case "mode":
				// 获取到方式数据
				data = rentType;
				cols = 1;
				break;
			case "price":
				data = price;
				cols = 1;
				break;
			default:
				break;
		}

		return (
			<FilterPicker
				onCancel={this.onCancel}
				onSave={this.onSave}
				data={data}
				cols={cols}
				type={openType}
				defaultValue={defaultValue}
				key={openType}
			/>
		);
	}

	render() {
		const { titleSelectedStatus, openType } = this.state;

		return (
			<div className={styles.root}>
				{/* 前三个菜单的遮罩层 */}
				{openType === "area" || openType === "mode" || openType === "price" ? (
					<div className={styles.mask} onClick={this.onCancel} />
				) : null}
				{/* <div className={styles.mask} /> */}

				<div className={styles.content}>
					{/* 标题栏 */}
					<FilterTitle
						titleSelectedStatus={titleSelectedStatus}
						onClick={this.onTitleClick}
					/>

					{/* 前三个菜单对应的内容 */}
					{this.renderFilterPicker()}

					{/* 最后一个菜单对应的内容 */}
					{/* <FilterMore /> */}
				</div>
			</div>
		);
	}
}

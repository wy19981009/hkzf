import React, { Component } from "react";

// 导入react-spring组件
import { Spring } from "react-spring/renderprops";

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
		// 获取body
		this.htmlBody = document.body;
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
		// 给body添加样式
		this.htmlBody.className = "body-fixed";

		const { titleSelectedStatus, selectedValues } = this.state;
		// 创建新的标题选中状态对象
		const newTitleSelectedStatus = { ...titleSelectedStatus };
		// 遍历标题选中状态对象
		Object.keys(titleSelectedStatus).forEach((key) => {
			if (key === type) {
				// 当前标题
				newTitleSelectedStatus[type] = true;
				return;
			}

			// 其他标题
			const selectedVal = selectedValues[key];
			if (
				key === "area" &&
				(selectedVal.length !== 2 || selectedVal[0] !== "area")
			) {
				// 高亮
				newTitleSelectedStatus[key] = true;
			} else if (key === "mode" && selectedVal[0] !== "null") {
				// 高亮
				newTitleSelectedStatus[key] = true;
			} else if (key === "price" && selectedVal[0] !== "null") {
				// 高亮
				newTitleSelectedStatus[key] = true;
			} else if (key === "more" && selectedVal.length !== 0) {
				// 高亮
				newTitleSelectedStatus[key] = true;
			} else {
				newTitleSelectedStatus[key] = false;
			}
		});

		this.setState({
			// 展示对话框
			openType: type,
			// 使用新的状态来高亮
			titleSelectedStatus: newTitleSelectedStatus,
		});
	};

	// 取消(隐藏)对话框
	onCancel = (type) => {
		this.htmlBody.className = "";
		// console.log(type);
		const { titleSelectedStatus, selectedValues } = this.state;
		// 创建新的标题选中状态对象
		const newTitleSelectedStatus = { ...titleSelectedStatus };
		const selectedVal = selectedValues[type];
		if (
			type === "area" &&
			(selectedVal.length !== 2 || selectedVal[0] !== "area")
		) {
			// 高亮
			newTitleSelectedStatus[type] = true;
		} else if (type === "mode" && selectedVal[0] !== "null") {
			// 高亮
			newTitleSelectedStatus[type] = true;
		} else if (type === "price" && selectedVal[0] !== "null") {
			// 高亮
			newTitleSelectedStatus[type] = true;
		} else if (type === "more" && selectedVal.length !== 0) {
			// 高亮
			newTitleSelectedStatus[type] = true;
		} else {
			newTitleSelectedStatus[type] = false;
		}
		this.setState({
			openType: "",
			titleSelectedStatus: newTitleSelectedStatus,
		});
	};

	// 确定(隐藏对话框)
	onSave = (type, value) => {
		// console.log(type, value);
		// 菜单高亮逻辑处理
		// 其他标题
		this.htmlBody.className = "";

		const { titleSelectedStatus } = this.state;
		// 创建新的标题选中状态对象
		const newTitleSelectedStatus = { ...titleSelectedStatus };
		const selectedVal = value;
		if (
			type === "area" &&
			(selectedVal.length !== 2 || selectedVal[0] !== "area")
		) {
			// 高亮
			newTitleSelectedStatus[type] = true;
		} else if (type === "mode" && selectedVal[0] !== "null") {
			// 高亮
			newTitleSelectedStatus[type] = true;
		} else if (type === "price" && selectedVal[0] !== "null") {
			// 高亮
			newTitleSelectedStatus[type] = true;
		} else if (type === "more" && selectedVal.length !== 0) {
			// 高亮
			newTitleSelectedStatus[type] = true;
		} else {
			newTitleSelectedStatus[type] = false;
		}

		const newSelectedValue = {
			...this.state.selectedValues,
			// 值更新
			[type]: value,
		};

		// console.log(newSelectedValue);

		const { area, mode, price, more } = newSelectedValue;

		// 筛选条件属性
		const fliters = {};

		// 区域
		const areaKey = area[0];
		let areaValue = "null";
		if (area.length === 3) {
			areaValue = area[2] !== "null" ? area[2] : area[1];
		}

		fliters[areaKey] = areaValue;

		// 方式和租金
		fliters.mode = mode[0];
		fliters.price = price[0];

		// 更多more
		fliters.more = more.join(",");

		// console.log(fliters);

		// 调用父组件onFilter方法
		this.props.onFilter(fliters);

		// console.log(fliters);

		this.setState({
			openType: "",
			titleSelectedStatus: newTitleSelectedStatus,
			selectedValues: newSelectedValue,
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

	renderFilterMore() {
		const {
			openType,
			filtersData: { roomType, oriented, floor, characteristic },
			selectedValues,
		} = this.state;
		if (openType !== "more") {
			return null;
		}

		const data = {
			roomType,
			oriented,
			floor,
			characteristic,
		};

		const defaultValue = selectedValues.more;
		return (
			<FilterMore
				data={data}
				type={openType}
				onSave={this.onSave}
				defaultValue={defaultValue}
				onCancel={this.onCancel}
			/>
		);
	}

	// 渲染遮罩层div
	renderMask() {
		const { openType } = this.state;
		const isHide =
			openType === "area" || openType === "mode" || openType === "price";
		return (
			<Spring from={{ opacity: 0 }} to={{ opacity: isHide ? 1 : 0 }}>
				{(props) => {
					if (props.opacity === 0) {
						return null;
					}
					return (
						<div
							style={props}
							className={styles.mask}
							onClick={() => this.onCancel(openType)}
						/>
					);
				}}
			</Spring>
		);
	}

	render() {
		const { titleSelectedStatus } = this.state;

		return (
			<div className={styles.root}>
				{/* 前三个菜单的遮罩层 */}
				{this.renderMask()}
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
					{this.renderFilterMore()}
				</div>
			</div>
		);
	}
}

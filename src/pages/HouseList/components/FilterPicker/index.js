import React, { Component } from "react";

import FilterFooter from "../../../../components/FilterFooter";

import { PickerView } from "antd-mobile";

const province = ["北京", "上海"];

export default class FilterPicker extends Component {
	render() {
		return (
			<>
				{/* 选择器组件 */}
				<PickerView data={province} value={null} cols={3} />

				{/* 底部按钮 */}
				<FilterFooter />
			</>
		);
	}
}

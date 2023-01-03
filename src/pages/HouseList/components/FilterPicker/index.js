import React, { Component } from "react";

import FilterFooter from "../../../../components/FilterFooter";

import { PickerView } from "antd-mobile";

export default class FilterPicker extends Component {
	state = {
		value: this.props.defaultValue,
	};

	render() {
		const { onCancel, onSave, data, cols, type } = this.props;
		const { value } = this.state;
		return (
			<>
				{/* 选择器组件 */}
				<PickerView
					data={data}
					value={value}
					cols={cols}
					onChange={(val) => {
						// console.log(val);
						this.setState({
							value: val,
						});
					}}
				/>

				{/* 底部按钮 */}
				<FilterFooter
					onCancel={() => onCancel(type)}
					onOK={() => onSave(type, this.state.value)}
				/>
			</>
		);
	}
}

import React from "react";

// 导入搜索导航栏组件
import SearchHeader from "../../components/SearchHeader";

// 获取当前城市定位信息
const { label } = JSON.parse(localStorage.getItem("hkzf_city"));

export default class HouseList extends React.Component {
	render() {
		return (
			<div>
				<SearchHeader cityName={label} />
			</div>
		);
	}
}

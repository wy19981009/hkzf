import React, { Component } from "react";

import NavHeader from "../../components/NavHeader";
import NoHouse from "../../components/NoHouse";

export default class Other extends Component {
	render() {
		return (
			<div>
				<NavHeader>未开发页面</NavHeader>
				<NoHouse>暂未开发，敬请期待</NoHouse>
			</div>
		);
	}
}

import React, { Component } from "react";

import NavHeader from "../../components/NavHeader";
import NoHouse from "../../components/NoHouse";

export default class HouseInspection extends Component {
	render() {
		return (
			<div>
				<NavHeader>看房记录</NavHeader>
				<NoHouse>暂未开发，敬请期待</NoHouse>
			</div>
		);
	}
}

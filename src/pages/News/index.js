import React from "react";

import NavHeader from "../../components/NavHeader";

import NoHouse from "../../components/NoHouse";

import "./index.scss";

export default class News extends React.Component {
	render() {
		return (
			<div>
				<NavHeader>资讯</NavHeader>
				<NoHouse>暂无资讯</NoHouse>
			</div>
		);
	}
}

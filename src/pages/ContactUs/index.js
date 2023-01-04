import React, { Component } from "react";

import NavHeader from "../../components/NavHeader";

import { List } from "antd-mobile";

const Item = List.Item;

export default class ContactUs extends Component {
	render() {
		return (
			<div>
				<NavHeader>联系我们</NavHeader>
				<List>
					<a href='tel:15687751392'>
						<Item arrow='horizontal' onClick={() => {}}>
							电话预约
						</Item>
					</a>

					<Item
						arrow='horizontal'
						onClick={() => {
							this.props.history.push("/onlinecontact");
						}}
					>
						在线联系
					</Item>
				</List>
			</div>
		);
	}
}

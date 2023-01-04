import React, { Component } from "react";

import styles from "./index.module.css";
import NavHeader from "../../components/NavHeader";

import { API, BASE_URL } from "../../utils";

import { List, Toast } from "antd-mobile";

const Item = List.Item;

export default class PersonalData extends Component {
	state = {
		personalData: {
			avatar: "",
			gender: "",
			id: 0,
			nickname: "",
			phone: "",
		},
	};

	componentDidMount() {
		this.getPersonalData();
	}

	async getPersonalData() {
		const res = await API.get("/user");
		// console.log(res);
		this.setState({
			personalData: res.data.body,
		});
		// console.log(this.state.personalData);
	}

	changeData() {
		Toast.info("暂未开发，敬请期待", 1, null, false);
	}

	render() {
		const { history } = this.props;
		const { avatar, gender, nickname, phone } = this.state.personalData;
		return (
			<div className={styles.root}>
				<NavHeader className='favorate-nav' onLeftClick={() => history.go(-1)}>
					个人资料
				</NavHeader>

				<List>
					<Item
						thumb={BASE_URL + avatar}
						arrow='horizontal'
						onClick={() => {
							this.changeData();
						}}
					>
						头像
					</Item>
					<Item
						extra={gender === "1" ? "男" : "女"}
						arrow='horizontal'
						onClick={() => {
							this.changeData();
						}}
					>
						性别
					</Item>
					<Item
						extra={nickname}
						arrow='horizontal'
						onClick={() => {
							this.changeData();
						}}
					>
						昵称
					</Item>
					<Item
						extra={phone}
						arrow='horizontal'
						onClick={() => {
							this.changeData();
						}}
					>
						电话
					</Item>
				</List>
			</div>
		);
	}
}

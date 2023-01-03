import React, { Component } from "react";
import { Flex, WingBlank, WhiteSpace, Toast } from "antd-mobile";

import { Link } from "react-router-dom";

import { API } from "../../utils";

// 导入withFormik
import { withFormik } from "formik";

import NavHeader from "../../components/NavHeader";

import styles from "./index.module.css";

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
	// state = {
	// 	username: "",
	// 	password: "",
	// };

	// getUserName = (e) => {
	// 	this.setState({
	// 		username: e.target.value,
	// 	});
	// };

	// getPassword = (e) => {
	// 	this.setState({
	// 		password: e.target.value,
	// 	});
	// };

	// // 表单提交
	// handleSubmit = async (e) => {
	// 	// 阻止默认提交行为
	// 	e.preventDefault();

	// 	// 获取账号和密码
	// 	const { username, password } = this.state;
	// 	// console.log("表单提交了", username, password);
	// 	// 发送请求，实现登录
	// 	const res = await API.post("/user/login", {
	// 		username: username,
	// 		password: password,
	// 	});
	// 	// console.log(res);
	// 	const { status, body, description } = res.data;
	// 	if (status === 200) {
	// 		// 登录成功
	// 		localStorage.setItem("hkzf_token", body.token);
	// 		this.props.history.go(-1);
	// 	} else {
	// 		// 登录失败
	// 		Toast.info(description, 2, null, false);
	// 	}
	// };

	render() {
		const { values, handleSubmit, handleChange } = this.props;
		// console.log(values, handleSubmit, handleChange);
		return (
			<div className={styles.root}>
				{/* 顶部导航 */}
				<NavHeader className={styles.navHeader}>账号登录</NavHeader>
				<WhiteSpace size='xl' />

				{/* 登录表单 */}
				<WingBlank>
					<form onSubmit={handleSubmit}>
						<div className={styles.formItem}>
							<input
								value={values.username}
								className={styles.input}
								name='username'
								onChange={handleChange}
								placeholder='请输入账号'
							/>
						</div>
						{/* 长度为5到8位，只能出现数字、字母、下划线 */}
						{/* <div className={styles.error}>账号为必填项</div> */}
						<div className={styles.formItem}>
							<input
								className={styles.input}
								value={values.password}
								onChange={handleChange}
								name='password'
								type='password'
								placeholder='请输入密码'
							/>
						</div>
						{/* 长度为5到12位，只能出现数字、字母、下划线 */}
						{/* <div className={styles.error}>账号为必填项</div> */}
						<div className={styles.formSubmit}>
							<button className={styles.submit} type='submit'>
								登 录
							</button>
						</div>
					</form>
					<Flex className={styles.backHome}>
						<Flex.Item>
							<Link to='/registe'>还没有账号，去注册~</Link>
						</Flex.Item>
					</Flex>
				</WingBlank>
			</div>
		);
	}
}

// 使用withFormik高阶组件包装Login组件，提供表单验证
Login = withFormik({
	// 提供状态
	mapPropsToValues: () => ({
		username: "",
		password: "",
	}),
	handleSubmit: async (values, { props }) => {
		const { username, password } = values;
		// console.log("表单提交了", username, password);
		// 发送请求，实现登录
		const res = await API.post("/user/login", {
			username,
			password,
		});
		console.log(res);
		const { status, body, description } = res.data;
		if (status === 200) {
			// 登录成功
			localStorage.setItem("hkzf_token", body.token);
			props.history.go(-1);
		} else {
			// 登录失败
			Toast.info(description, 2, null, false);
		}
	},
})(Login);

export default Login;

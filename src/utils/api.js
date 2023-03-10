import axios from "axios";
import { BASE_URL } from "./url";

import { getToken, removeToken } from "./auth";

const API = axios.create({
	baseURL: BASE_URL,
});

// 添加请求拦截器
API.interceptors.request.use((config) => {
	// console.log(config, config.url);
	const { url } = config;
	if (
		url.startsWith("/user") &&
		!url.startsWith("/user/login") &&
		!url.startsWith("/user/registered")
	) {
		// 添加请求头
		config.headers.Authorization = getToken();
	}
	return config;
});

// 添加响应拦截器
API.interceptors.response.use((response) => {
	// console.log(response);
	const { status } = response.data;
	if (status === 400) {
		// 移除token
		removeToken();
	}
	return response;
});

export { API };

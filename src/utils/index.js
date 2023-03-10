import axios from "axios";
// 创建并导出获取城市定位的函数
import { BASE_URL } from "./url";
export const getCurrentCity = () => {
	// 判断localStorage中是否有定位城市
	const localCity = JSON.parse(localStorage.getItem("hkzf_city"));
	if (!localCity) {
		// 如果没有，就获取并存储
		return new Promise((resolve, reject) => {
			const curCity = new window.BMapGL.LocalCity();
			curCity.get(async (res) => {
				try {
					// console.log('当前城市信息：', res)
					const result = await axios.get(
						`${BASE_URL}/area/info?name=${res.name}`,
					);
					// console.log(result)
					// 存储到本地存储中
					localStorage.setItem("hkzf_city", JSON.stringify(result.data.body));
					// 返回该城市数据
					resolve(result.data.body);
				} catch (e) {
					reject(e);
				}
			});
		});
	}

	// 如果有，直接返回数据
	return Promise.resolve(localCity);
};

export { API } from "./api";
export { BASE_URL };

export * from "./auth";

export { getCity, setCity } from "./city";

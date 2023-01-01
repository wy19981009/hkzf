import React from "react";
import { Link } from "react-router-dom";

// 导入axios
// import axios from "axios";
import { API } from "../../utils/api";

// 导入Toast组件
import { Toast } from "antd-mobile";

// 导入顶部导航栏组件
import NavHeader from "../../components/NavHeader";

// 导入baseurl
import { BASE_URL } from "../../utils/url";

// import './index.scss'
import styles from "./index.module.css";

const BMapGL = window.BMapGL;

// 覆盖物样式
const labelStyle = {
	cursor: "pointer",
	border: "0px solid rgb(255,0,0)",
	padding: "0px",
	whiteSpace: "nowrap",
	fontSize: "12px",
	color: "rgb(255,255,255)",
	textAlign: "center",
};

export default class Map extends React.Component {
	state = {
		// 小区下的房源列表
		housesList: [],
		// 是否展示房源列表
		isShowList: false,
	};

	componentDidMount() {
		this.initMap();
	}

	// 初始化地图
	initMap() {
		// 获取当前定位城市
		const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));

		// 初始化地图实例
		const map = new BMapGL.Map("container");
		// 作用：在其他方法中通过this来获取到地图对象
		this.map = map;
		// 设置中心点坐标
		// const point = new window.BMapGL.Point(116.404, 39.915);

		//创建地址解析器实例
		const myGeo = new BMapGL.Geocoder();
		// 将地址解析结果显示在地图上，并调整地图视野
		myGeo.getPoint(
			label,
			async (point) => {
				if (point) {
					map.centerAndZoom(point, 11);
					map.addControl(new BMapGL.ZoomControl());
					map.addControl(new BMapGL.ScaleControl());

					// 调用renderOverlays方法
					this.renderOverlays(value);
				} else {
					alert("您选择的地址没有解析到结果！");
				}
			},
			label,
		);

		// 给地图绑定移动事件
		map.addEventListener("movestart", () => {
			// console.log("movestart");
			if (this.state.isShowList) {
				this.setState({
					isShowList: false,
				});
			}
		});
	}

	// 渲染覆盖物入口
	async renderOverlays(id) {
		try {
			// 开启Loading
			Toast.loading("加载中...", 0, null, false);
			const res = await API.get(`/area/map?id=${id}`);
			// 关闭loading
			Toast.hide();
			// console.log(res);
			const data = res.data.body;

			// 获取地图缩放级别
			this.getTypeAndZoom();

			// 调用getTypeAndZoom()方法获取级别和类型
			const { nextZoom, type } = this.getTypeAndZoom();

			data.forEach((item) => {
				// 创建覆盖物
				this.createOverlays(item, nextZoom, type);
			});
		} catch (e) {
			// 关闭loading
			Toast.hide();
		}
	}

	// 计算要绘制的覆盖物类型和下一个缩放级别
	getTypeAndZoom() {
		// 调用地图的getZoom()方 法来获取当前缩放级别
		const zoom = this.map.getZoom();
		let nextZoom, type;
		// console.log(zoom);
		if (zoom >= 10 && zoom <= 12) {
			// 区缩放级别
			// 下一个缩放级别
			nextZoom = 13;
			// circle 表示绘制圆形
			type = "circle";
		} else if (zoom >= 12 && zoom <= 14) {
			// 镇
			nextZoom = 15;
			type = "circle";
		} else if (zoom >= 14 && zoom <= 16) {
			// 小区
			type = "rect";
		}

		return {
			nextZoom,
			type,
		};
	}

	// 创建覆盖物方法
	createOverlays(data, zoom, type) {
		const {
			coord: { longitude, latitude },
			label: areaName,
			count,
			value,
		} = data;

		// 创建坐标对象
		const areaPoint = new BMapGL.Point(longitude, latitude);
		if (type === "circle") {
			// 区和镇
			this.createCircle(areaPoint, areaName, count, value, zoom);
		} else {
			// 小区
			this.createRect(areaPoint, areaName, count, value);
		}
	}

	// 创建区镇的覆盖物
	createCircle(point, name, count, id, zoom) {
		// 创建label实例对象
		const label = new BMapGL.Label("", {
			position: point,
			offset: new BMapGL.Size(-35, -35),
		});

		// 添加唯一标识
		label.id = id;

		// 设置房源覆盖物内容
		label.setContent(`
					    <div class="${styles.bubble}">
					        <p class="${styles.name}">${name}</p>
					        <p>${count}套</p>
					    </div>
					`);
		// 调用setstyle()方法设置样式
		label.setStyle(labelStyle);

		// 点击事件
		label.addEventListener("click", () => {
			// 调用renderOverlays() 方法
			this.renderOverlays(id);
			// 放大地图
			this.map.centerAndZoom(point, zoom);

			// 清除当前覆盖物信息
			this.map.clearOverlays();
		});

		// 在map对象上调用addOverlay()方法，将文本覆盖物调价到地图中
		this.map.addOverlay(label);
	}

	// 创建小区覆盖物
	createRect(point, name, count, id) {
		// 创建label实例对象
		const label = new BMapGL.Label("", {
			position: point,
			offset: new BMapGL.Size(-50, -28),
		});

		// 添加唯一标识
		label.id = id;

		// 设置房源覆盖物内容
		label.setContent(`
					    <div class="${styles.rect}">
                            <span class="${styles.housename}">${name}</span>
                            <span class="${styles.housenum}">${count}套</span>
                            <i class="${styles.arrow}"></i>
                        </div>
					`);
		// 调用setstyle()方法设置样式
		label.setStyle(labelStyle);

		// 点击事件
		label.addEventListener("click", (e) => {
			// console.log("小区被点击了");
			// 获取小区房源信息
			this.getHousesList(id);

			// 获取当前点击项
			// console.log(e);
			const target = e.domEvent.changedTouches[0];
			// console.log(target);
			this.map.panBy(
				window.innerWidth / 2 - target.clientX,
				(window.innerHeight - 330) / 2 - target.clientY,
			);
		});

		// 在map对象上调用addOverlay()方法，将文本覆盖物调价到地图中
		this.map.addOverlay(label);
	}

	// 获取小区房源数据
	async getHousesList(id) {
		try {
			// 开启Loading
			Toast.loading("加载中...", 0, null, false);
			const res = await API.get(`/houses?cityId=${id}`);
			// 关闭loading
			Toast.hide();
			// console.log(res);
			this.setState({
				housesList: res.data.body.list,
				// 展示房源列表信息
				isShowList: true,
			});
		} catch (e) {
			// 关闭loading
			Toast.hide();
		}
	}

	// 封装渲染房屋列表的方法
	renderHousesList() {
		return this.state.housesList.map((item) => (
			<div className={styles.house} key={item.houseCode}>
				<div className={styles.imgWrap}>
					<img className={styles.img} src={BASE_URL + item.houseImg} alt='' />
				</div>
				<div className={styles.content}>
					<h3 className={styles.title}>{item.title}</h3>
					<div className={styles.desc}>{item.desc}</div>
					<div>
						{item.tags.map((tag, index) => {
							const tagClass = "tag" + (index + 1);
							return (
								<span
									className={[styles.tag, styles[tagClass]].join(" ")}
									key={tag}
								>
									{tag}
								</span>
							);
						})}
					</div>
					<div className={styles.price}>
						<span className={styles.priceNum}>{item.price}</span>元/月
					</div>
				</div>
			</div>
		));
	}

	render() {
		return (
			<div className={styles.map}>
				{/* 顶部导航栏 */}
				<NavHeader>地图找房</NavHeader>
				{/* 地图容器 */}
				<div id='container' className={styles.container}></div>

				{/* 房源列表 */}
				<div
					className={[
						styles.houseList,
						this.state.isShowList ? styles.show : "",
					].join(" ")}
				>
					<div className={styles.titleWrap}>
						<h1 className={styles.listTitle}>房屋列表</h1>
						<Link className={styles.titleMore} to='/home/list'>
							更多房源
						</Link>
					</div>

					<div className={styles.houseItems}>
						{/* 房屋结构 */}
						{this.renderHousesList()}
					</div>
				</div>
			</div>
		);
	}
}

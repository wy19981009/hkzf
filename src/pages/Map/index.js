import React from "react";

// 导入顶部导航栏组件
import NavHeader from "../../components/NavHeader";

// import './index.scss'
import styles from './index.module.css'

const BMapGL = window.BMapGL

export default class Map extends React.Component {

    componentDidMount() {
        this.initMap();
    }

    // 初始化地图
    initMap() {
        // 获取当前定位城市
        const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'));
        console.log(label, value);

        // 初始化地图实例
        // 在react脚手架中全局对象需要使用window来访问，否则会造成ESlint报错
        const map = new BMapGL.Map('container');
        // 设置中心点坐标
        // const point = new window.BMapGL.Point(116.404, 39.915);

        //创建地址解析器实例
        const myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(label, (point) => {
            if (point) {
                map.centerAndZoom(point, 11);
                map.addControl(new BMapGL.ZoomControl())
                map.addControl(new BMapGL.ScaleControl())

            } else {
                alert('您选择的地址没有解析到结果！');
            }
        }, label)

        // 初始化地图
        // map.centerAndZoom(point, 11);
    }

    render() {
        return (
            <div className={styles.map}>
                {/* 顶部导航栏 */}
                <NavHeader>
                    地图找房
                </NavHeader>
                {/* 地图容器 */}
                <div id="container" className={styles.container}>

                </div>
            </div>
        )
    }
}
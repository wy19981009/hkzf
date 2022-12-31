import React from "react";

// 导入顶部导航栏组件
import NavHeader from "../../components/NavHeader";

import './index.scss'

export default class Map extends React.Component {

    componentDidMount() {
        // 初始化地图实例
        // 在react脚手架中全局对象需要使用window来访问，否则会造成ESlint报错
        const map = new window.BMapGL.Map('container');
        // 设置中心点坐标
        const point = new window.BMapGL.Point(116.404, 39.915);
        map.centerAndZoom(point, 15);
    }

    render() {
        return (
            <div className="map">
                {/* 顶部导航栏 */}
                <NavHeader>
                    地图找房
                </NavHeader>
                {/* 地图容器 */}
                <div id="container">

                </div>
            </div>
        )
    }
}
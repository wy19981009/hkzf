import React from "react";

// 导入顶部导航栏组件
import NavHeader from "../../components/NavHeader";

// 导入axios
import axios from 'axios';

// import './index.scss'
import styles from './index.module.css'

const BMapGL = window.BMapGL

// 覆盖物样式
const labelStyle = {
    cursor: 'pointer',
    border: '0px solid rgb(255,0,0)',
    padding: '0px',
    whiteSpace: 'nowrap',
    fontSize: '12px',
    color: 'rgb(255,255,255)',
    textAlign: 'center'
}

export default class Map extends React.Component {

    componentDidMount() {
        this.initMap();
    }

    // 初始化地图
    initMap() {
        // 获取当前定位城市
        const { label, value } = JSON.parse(localStorage.getItem('hkzf_city'));

        // 初始化地图实例
        const map = new BMapGL.Map('container');
        // 作用：在其他方法中通过this来获取到地图对象 
        this.map = map;
        // 设置中心点坐标
        // const point = new window.BMapGL.Point(116.404, 39.915);

        //创建地址解析器实例
        const myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(label, async (point) => {
            if (point) {
                map.centerAndZoom(point, 11);
                map.addControl(new BMapGL.ZoomControl())
                map.addControl(new BMapGL.ScaleControl())

                // 调用renderOverlays方法
                this.renderOverlays(value);

                // 获取房源数据
                // const res = await axios.get(`http://localhost:8080/area/map?id=${value}`)
                // console.log(res);
                // res.data.body.forEach(item => {

                //     const { coord: { longitude, latitude }, label: areaName, count, value } = item

                //     const areaPoint = new BMapGL.Point(longitude, latitude)
                //     // 创建label实例对象
                //     const label = new BMapGL.Label('', {
                //         position: areaPoint,
                //         offset: new BMapGL.Size(-35, -35)
                //     })

                //     // 添加唯一标识
                //     label.id = value

                //     // 设置房源覆盖物内容
                //     label.setContent(`
                //     <div class="${styles.bubble}">
                //         <p class="${styles.name}">${areaName}</p>
                //         <p>${count}套</p>
                //     </div>
                // `)
                //     // 调用setstyle()方法设置样式
                //     label.setStyle(labelStyle)

                //     // 点击事件
                //     label.addEventListener('click', () => {
                //         console.log('房源覆盖物被点击了', label.id);
                //         // 放大地图
                //         map.centerAndZoom(areaPoint, 13)

                //         // 清除当前覆盖物信息
                //         map.clearOverlays()
                //     })

                //     // 在map对象上调用addOverlay()方法，将文本覆盖物调价到地图中
                //     map.addOverlay(label)

                // })



                // // 创建label实例对象
                // const label = new BMapGL.Label('', {
                //     position: point,
                //     offset: new BMapGL.Size(-35, -35)
                // })

                // // 设置房源覆盖物内容
                // label.setContent(`
                //     <div class="${styles.bubble}">
                //         <p class="${styles.name}">浦东</p>
                //         <p>99套</p>
                //     </div>
                // `)
                // // 调用setstyle()方法设置样式
                // label.setStyle(labelStyle)

                // // 点击事件
                // label.addEventListener('click', () => {
                //     console.log('房源覆盖物被点击了');
                // })

                // 在map对象上调用addOverlay()方法，将文本覆盖物调价到地图中
                // map.addOverlay(label)


            } else {
                alert('您选择的地址没有解析到结果！');
            }
        }, label)

        // 初始化地图
        // map.centerAndZoom(point, 11);
    }

    // 渲染覆盖物入口
    async renderOverlays(id) {
        const res = await axios.get(`http://localhost:8080/area/map?id=${id}`)
        // console.log(res);
        const data = res.data.body

        // 获取地图缩放级别
        this.getTypeAndZoom()

        // 调用getTypeAndZoom()方法获取级别和类型
        const { nextZoom, type } = this.getTypeAndZoom()

        data.forEach(item => {
            // 创建覆盖物
            this.createOverlays(item, nextZoom, type)
        });

    }

    // 计算要绘制的覆盖物类型和下一个缩放级别
    getTypeAndZoom() {
        // 调用地图的getZoom()方 法来获取当前缩放级别
        const zoom = this.map.getZoom();
        let nextZoom, type
        // console.log(zoom);
        if (zoom >= 10 && zoom <= 12) {
            // 区缩放级别
            // 下一个缩放级别
            nextZoom = 13
            // circle 表示绘制圆形
            type = 'circle'
        } else if (zoom >= 12 && zoom <= 14) {
            // 镇
            nextZoom = 15
            type = 'circle'
        } else if (zoom >= 14 && zoom <= 16) {
            // 小区
            type = 'rect'
        }

        return {
            nextZoom,
            type
        }

    }

    // 创建覆盖物方法
    createOverlays() { }

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
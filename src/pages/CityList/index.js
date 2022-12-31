import React from "react";

// 导入axios
import axios from "axios";

import './index.scss'

import { NavBar } from 'antd-mobile';

// 数据格式化方法
const formtCityData = (list) => {
    const cityList = {}
    // const cityIndex = []

    // 遍历list数组
    list.forEach((item) => {
        // 获取每一个城市的首字母
        const first = item.short.substr(0,1);
        // 判断cityList中是否有该分类，有则直接push，无则创建
        if (cityList[first]) {
            cityList[first].push(item);
        } else {
            cityList[first] = [item];
        }
    })

    // 获取索引数据
    const cityIndex = Object.keys(cityList).sort()
    
    
    return {
        cityList,
        cityIndex
    }
}
export default class CityList extends React.Component {


    componentDidMount() {
        this.getCityList();
    }

    // 获取城市列表的方法
    async getCityList() {
        const res = await axios.get('http://localhost:8080/area/city?level=1');
        const { cityList, cityIndex } = formtCityData(res.data.body);
        console.log(cityList, cityIndex);
    }

    render() {
        return (
            <div className="citylist">
                {/* 顶部导航栏 */}
                <NavBar
                    className="navBar"
                    mode="light"
                    icon={<i className="iconfont icon-back"/>}
                    onLeftClick={() => this.props.history.go(-1)}>城市选择</NavBar>
            </div>
        )
    }
}
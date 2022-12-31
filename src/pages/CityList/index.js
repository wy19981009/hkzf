import React from "react";

import './index.scss'

import { NavBar } from 'antd-mobile';
export default class CityList extends React.Component {
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
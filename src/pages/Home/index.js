import React from "react";

import { TabBar } from 'antd-mobile';

import { Route } from "react-router-dom";
import News from '../News'
import Index from "../Index";
import HouseList from "../HouseList";
import Profile from "../Profile";

// 导入组件自己的样式
import './index.css'

// TabBar数据
const tabItems = [
    {
        title: '首页',
        icon: 'icon-ind',
        path: '/home'
    },
    {
        title: '找房',
        icon: 'icon-findHouse',
        path: '/home/list'
    },
    {
        title: '资讯',
        icon: 'icon-infom',
        path: '/home/news'
    },
    {
        title: '我的',
        icon: 'icon-my',
        path: '/home/profile'
    }
]

export default class Home extends React.Component {
    state = {
        // 默认选中
        selectedTab: this.props.location.pathname
        // 用于控制TabBar的展示和隐藏，值为false，不隐藏
        // hidden: false,
        // 是否全屏，默认为false，不全屏
        // fullScreen: false,
    };

    componentDidUpdate(prevProps) {
        // console.log('上一次的路由信息：', prevProps);
        // console.log('本次的路由信息：', this.props);
        // 解决了点击菜单导航时不高亮问题
        if (prevProps.location.pathname !== this.props.location.pathname) {
            // 此时就说明路由发生切换了
            this.setState({
                selectedTab: this.props.location.pathname
            })
        }

    }

    // 渲染TarBar.Item
    renderTabBarItem() {
        return tabItems.map(item => <TabBar.Item
            title={item.title}
            key={item.title}
            icon={
                <i className={`iconfont ${item.icon}`}></i>
            }
            selectedIcon={
                <i className={`iconfont ${item.icon}`}></i>
            }
            selected={this.state.selectedTab === item.path}

            onPress={() => {
                this.setState({
                    selectedTab: item.path,
                });
                // 路由切换
                this.props.history.push(item.path);
            }}
        >

        </TabBar.Item>)
    }

    render() {
        return (
            <div className="home">
                {/* 渲染子路由 */}
                <Route path="/home/news" component={News}></Route>
                <Route exact path="/home" component={Index}></Route>
                <Route path="/home/list" component={HouseList}></Route>
                <Route path="/home/profile" component={Profile}></Route>

                {/* TabBar */}

                <TabBar noRenderContent={true} unselectedTintColor="#888" tintColor="#21b97a" barTintColor="white">
                    {this.renderTabBarItem()}
                </TabBar>
            </div>
        )
    }
}
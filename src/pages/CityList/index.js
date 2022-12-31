import React from "react";

// 导入axios
import axios from "axios";

import "./index.scss";

import { NavBar, Toast } from "antd-mobile";

// 导入utils中封装的当前定位功能的方法
import { getCurrentCity } from "../../utils/index";

// 导入list组件
import { List, AutoSizer } from "react-virtualized";

// 列表数据的数据源
// const list = Array(100).fill('react-virtualized');

// 索引（A、B等）的高度
const TITLE_HEIGHT = 36;

// 每个城市名称的高度
const NAME_HEIGHT = 50;

// 封装处理字母索引的方法
const formatCityIndex = (letter) => {
    switch (letter) {
        case "#":
            return "当前定位";
        case "hot":
            return "热门城市";
        default:
            return letter.toUpperCase();
    }
};

// 数据格式化方法
const formtCityData = (list) => {
    const cityList = {};
    // const cityIndex = []

    // 遍历list数组
    list.forEach((item) => {
        // 获取每一个城市的首字母
        const first = item.short.substr(0, 1);
        // 判断cityList中是否有该分类，有则直接push，无则创建
        if (cityList[first]) {
            cityList[first].push(item);
        } else {
            cityList[first] = [item];
        }
    });

    // 获取索引数据
    const cityIndex = Object.keys(cityList).sort();

    return {
        cityList,
        cityIndex,
    };
};

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳'];
export default class CityList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            cityList: {},
            cityIndex: [],
            // 高亮索引号
            activeIndex: 0,
        };

        // 创建ref
        this.cityListComponent = React.createRef()
    }



    async componentDidMount() {
        // 这是异步调用的会导致measureAllRows方法报错,所以添加await
        await this.getCityList();

        // 调用measureAllRows，提前计算List中每一行的高度，实现精确跳转
        this.cityListComponent.current.measureAllRows();
    }

    // 获取城市列表的方法
    async getCityList() {
        const res = await axios.get("http://localhost:8080/area/city?level=1");
        const { cityList, cityIndex } = formtCityData(res.data.body);

        // 获取热门城市列表
        const hotRes = await axios.get("http://localhost:8080/area/hot");
        // console.log(hotRes);
        // 将热门城市数据添加到cityList中
        cityList["hot"] = hotRes.data.body;
        // 将索引添加到cityIndex中
        cityIndex.unshift("hot");
        // 获取当前定位城市
        const curCity = await getCurrentCity();
        // 将当前定位城市数据添加到cityList中
        cityList["#"] = [curCity];
        // 将当前定位城市的索引添加到cityIndex中
        cityIndex.unshift("#");
        // console.log(cityList, cityIndex, curCity);
        this.setState({
            cityList,
            cityIndex,
        });
    }


    changeCity({ label, value }) {
        // console.log(curCity);
        if (HOUSE_CITY.indexOf(label) > -1) {
            // 有房源
            localStorage.setItem('hkzf_city', JSON.stringify({ label, value }));
            this.props.history.go(-1);
        } else {
            Toast.info('该城市暂无房源信息', 1, null, false);
        }
    }

    // 渲染每一行数据的渲染函数
    rowRenderer = ({
        key, // Unique key within array of rows
        index, // 索引号
        isScrolling, // 当前项是否在滚动中
        isVisible, // 当前项在LIST中是可见的
        style, // 必须的，一定要添加该样式
    }) => {
        // 获取每一行的字母索引
        const { cityIndex, cityList } = this.state;
        const letter = cityIndex[index];

        // 获取指定字母索引下的城市列表数据
        // cityList[letter]

        return (
            <div key={key} style={style} className='city'>
                <div className='title'>{formatCityIndex(letter)}</div>
                {cityList[letter].map((item) => (
                    <div className='name' key={item.value} onClick={() => this.changeCity(item)}>
                        {item.label}
                    </div>
                ))}
            </div>
        );
    };

    // 动态计算每一行高度的方法
    getRowHeight = ({ index }) => {
        // 索引标题高度 + 城市数量*城市名称高度
        // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
        const { cityList, cityIndex } = this.state;
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT;
    };

    // 封装渲染右侧索引列表的方法
    renderCityIndex() {
        // 获取cityIndex，并遍历
        const { cityIndex, activeIndex } = this.state;
        return cityIndex.map((item, index) => (
            <li
                className='city-index-item'
                key={item}
                onClick={() => {
                    // console.log(index);
                    this.cityListComponent.current.scrollToRow(index)
                }}
            >
                <span className={activeIndex === index ? "index-active" : ""}>
                    {item === "hot" ? "热" : item.toUpperCase()}
                </span>
            </li>
        ));
    }

    // 用于获取List组件中渲染行的信息
    onRowsRendered = ({ startIndex }) => {
        // console.log(startIndex);
        if (this.state.activeIndex !== startIndex) {
            this.setState({
                activeIndex: startIndex,
            });
        }
    };

    render() {
        return (
            <div className='citylist'>
                {/* 顶部导航栏 */}
                <NavBar
                    className='navBar'
                    mode='light'
                    icon={<i className='iconfont icon-back' />}
                    onLeftClick={() => this.props.history.go(-1)}
                >
                    城市选择
                </NavBar>

                {/* 城市列表 */}
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            ref={this.cityListComponent}
                            height={height}
                            rowCount={this.state.cityIndex.length}
                            rowHeight={this.getRowHeight}
                            rowRenderer={this.rowRenderer}
                            onRowsRendered={this.onRowsRendered}
                            width={width}
                            scrollToAlignment="start"
                        />
                    )}
                </AutoSizer>

                {/* 右侧索引列表 */}
                <ul className='city-index'>{this.renderCityIndex()}</ul>
            </div>
        );
    }
}

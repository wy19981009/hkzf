import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Home from "./pages/Home";

// 路由访问控制组件
import AuthRoute from "./components/AuthRoute";

// 使用动态组件方式导入组件
const CityList = lazy(() => import("./pages/CityList"));
const Map = lazy(() => import("./pages/Map"));
const HouseDetail = lazy(() => import("./pages/HouseDetail"));
const Login = lazy(() => import("./pages/Login"));
const Registe = lazy(() => import("./pages/Registe"));
const Rent = lazy(() => import("./pages/Rent"));
const RentAdd = lazy(() => import("./pages/Rent/Add"));
const RentSearch = lazy(() => import("./pages/Rent/Search"));
const Favorate = lazy(() => import("./pages/Favorate"));

function App() {
	return (
		<Router>
			<Suspense fallback={<div className='route-loading'>loading...</div>}>
				<div className='App'>
					{/* 配置路由 */}
					<Route path='/home' component={Home}></Route>
					<Route path='/citylist' component={CityList}></Route>
					<Route path='/map' component={Map}></Route>
					<Route path='/detail/:id' component={HouseDetail}></Route>
					<Route path='/login' component={Login}></Route>
					<Route path='/registe' component={Registe}></Route>
					<Route path='/favorate' component={Favorate}></Route>

					<AuthRoute exact path='/rent' component={Rent} />
					<AuthRoute exact path='/rent/add' component={RentAdd} />
					<AuthRoute exact path='/rent/search' component={RentSearch} />

					{/* 默认路由，实现重定向到首页 */}
					<Route exact path='/' render={() => <Redirect to='/home' />}></Route>
				</div>
			</Suspense>
		</Router>
	);
}

export default App;

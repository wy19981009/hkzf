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
const PersonalData = lazy(() => import("./pages/PersonalData"));
const Search = lazy(() => import("./pages/Search"));
const HouseInspection = lazy(() => import("./pages/HouseInspection"));
const BecomeHomeowner = lazy(() => import("./pages/BecomeHomeowner"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const OnlineContact = lazy(() => import("./pages/OnlineContact"));
const Other = lazy(() => import("./pages/Other"));

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
					<Route path='/personaldata' component={PersonalData}></Route>
					<Route path='/search' component={Search}></Route>
					<AuthRoute
						path='/houseinspection'
						component={HouseInspection}
					></AuthRoute>
					<AuthRoute
						path='/becomehomeowner'
						component={BecomeHomeowner}
					></AuthRoute>
					<AuthRoute path='/contactus' component={ContactUs}></AuthRoute>
					<AuthRoute
						path='/onlinecontact'
						component={OnlineContact}
					></AuthRoute>
					<Route path='/other' component={Other}></Route>

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

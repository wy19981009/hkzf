import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Home from "./pages/Home";
import CityList from "./pages/CityList";
import Map from "./pages/Map";
import HouseDetail from "./pages/HouseDetail";
import Login from "./pages/Login";
import Registe from "./pages/Registe";
import Rent from "./pages/Rent";
import AuthRoute from "./components/AuthRoute";
import RentAdd from "./pages/Rent/Add";
import RentSearch from "./pages/Rent/Search";

function App() {
	return (
		<Router>
			<div className='App'>
				{/* 配置路由 */}
				<Route path='/home' component={Home}></Route>
				<Route path='/citylist' component={CityList}></Route>
				<Route path='/map' component={Map}></Route>
				<Route path='/detail/:id' component={HouseDetail}></Route>
				<Route path='/login' component={Login}></Route>
				<Route path='/registe' component={Registe}></Route>

				<AuthRoute exact path='/rent' component={Rent} />
				<AuthRoute exact path='/rent/add' component={RentAdd} />
				<AuthRoute exact path='/rent/search' component={RentSearch} />

				{/* 默认路由，实现重定向到首页 */}
				<Route exact path='/' render={() => <Redirect to='/home' />}></Route>
			</div>
		</Router>
	);
}

export default App;

import React from 'react';
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Register from '../pages/register/index';
import Navbar from '../components/navbar';
import Login from '../pages/login';
import User from '../pages/user';
import Home from '../pages/home';
import CreateBlog from '../pages/createBlog';
import PrivateRoute from './PrivateRoute';
import EditUser from '../pages/editUser';

import EditBlog from '../pages/editBlog';
import ReadBlog from '../pages/readBlog';

// const history = createBrowserHistory();

const MainRouter = props => {
	return (
		<BrowserRouter>
			{/* <Navbar /> */}
			<Switch>
				<PrivateRoute path="/profile/edit" component={EditUser} />
				<PrivateRoute path="/blogs/create" component={CreateBlog} />
				<PrivateRoute path="/blogs/:id/edit" component={EditBlog} />
				<Route path="/blogs/:id" component={ReadBlog} />
				<Route path="/users/:id" component={User} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
};

export default MainRouter;

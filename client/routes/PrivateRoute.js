import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from '../helpers/auth';

const PrivateRoute = ({ path, component: Component, ...rest }) => {
	return (
		<Route
			path={path}
			{...rest}
			render={props =>
				isAuthenticated() ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/login', state: { referrer: path } }}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;

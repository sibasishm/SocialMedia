import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../form/CreateProfile';
import PrivateRoute from './PrivateRoute';
import NotFound from '../layout/NotFound';

const Routes = () => {
	return (
		<section className='container'>
			<Alert />
			<Switch>
				<Route path='/register' component={Register} />
				<Route path='/login' component={Login} />
				<PrivateRoute eaxct path='/dashboard' component={Dashboard} />
				<PrivateRoute
					eaxct
					path='/create-profile'
					component={CreateProfile}
				/>
				<Route component={NotFound} />
			</Switch>
		</section>
	);
};

export default Routes;

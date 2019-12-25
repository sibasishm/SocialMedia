import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Register from '../../components/auth/Register';
import Login from '../../components/auth/Login';
import Alert from '../../components/layout/Alert';
import Dashboard from '../../components/dashboard/Dashboard';
import CreateProfile from '../../components/form/CreateProfile';
import Settings from '../user/Settings';
import PrivateRoute from './PrivateRoute';
import NotFound from '../../components/layout/NotFound';

const Routes = () => {
	return (
		<Container>
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
				<PrivateRoute exact path='/settings' component={Settings} />
				<Route component={NotFound} />
			</Switch>
		</Container>
	);
};

export default Routes;

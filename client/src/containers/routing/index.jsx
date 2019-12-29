import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Profile from '../people/Profile';
import Settings from '../user/Settings';
import PrivateRoute from './PrivateRoute';
import NotFound from '../../components/layout/NotFound';
import People from '../people';
import Events from '../events';
import Topics from '../topics';

const Routes = () => {
	return (
		<Container>
			<Switch>
				<Route exact path='/people' component={People} />
				<PrivateRoute path='/people:id' component={People} />
				<Route exact path='/events' component={Events} />
				<PrivateRoute path='/events:id' component={Events} />
				<Route exact path='/topics' component={Topics} />
				<PrivateRoute path='/topics:id' component={Topics} />
				<PrivateRoute eaxct path='/me' component={Profile} />
				<PrivateRoute path='/settings' component={Settings} />
				<Route component={NotFound} />
			</Switch>
		</Container>
	);
};

export default Routes;

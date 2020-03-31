import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import PrivateRoute from './PrivateRoute';
import People from '../user/People';
import Profile from '../user/Profile';
import GuestProfile from '../user/GuestProfile';
import Settings from '../user/Settings';
import Welcome from '../user/Welcome';
import Posts from '../topics/Posts';
import Post from '../topics/Post';
import Events from '../events/Events';
import NotFound from '../../components/layout/NotFound';

const Routes = () => {
	return (
		<Container>
			<Switch>
				<Route exact path='/people' component={People} />
				<PrivateRoute path='/people/:id' component={GuestProfile} />
				<Route exact path='/events' component={Events} />
				<PrivateRoute path='/events/:id' component={Events} />
				<Route exact path='/topics' component={Posts} />
				<PrivateRoute path='/topics/:id' component={Post} />
				<PrivateRoute eaxct path='/me' component={Profile} />
				<PrivateRoute eaxct path='/welcome' component={Welcome} />
				<PrivateRoute path='/settings' component={Settings} />
				<Route component={NotFound} />
			</Switch>
		</Container>
	);
};

export default Routes;

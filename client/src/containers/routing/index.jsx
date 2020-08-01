import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import PrivateRoute from './PrivateRoute';
import People from '../user/People';
import Profile from '../user/Profile';
import GuestProfile from '../user/GuestProfile';
import Settings from '../user/Settings';
import Posts from '../topics/Posts';
import Post from '../topics/Post';
import NotFound from '../../components/layout/NotFound';

const Routes = () => (
  <Container>
    <Switch>
      <Route exact path="/users" component={People} />
      <PrivateRoute path="/users/:id" component={GuestProfile} />
      <Route exact path="/posts" component={Posts} />
      <PrivateRoute path="/posts/:id" component={Post} />
      <PrivateRoute eaxct path="/me" component={Profile} />
      <PrivateRoute path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  </Container>
);

export default Routes;

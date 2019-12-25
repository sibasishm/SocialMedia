import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from '../components/nav/Navbar';
import Landing from './landing';
import Routes from './routing';
import { Segment } from 'semantic-ui-react';

// Redux
import { Provider } from 'react-redux';
import store from '../store';
import { loadUser, noToken } from '../actions/auth';

import { setAuthToken } from '../utils';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			store.dispatch(loadUser());
		} else {
			store.dispatch(noToken());
		}
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Segment textAlign='center' vertical>
						<Switch>
							<Route exact path='/' component={Landing} />
							<Route component={Routes} />
						</Switch>
					</Segment>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;

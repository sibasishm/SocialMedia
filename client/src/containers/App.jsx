import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

// StyleSheets
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import Navbar from '../components/nav/Navbar';
import Landing from './landing';
import Routes from './routing';
import Modal from './modal';

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
					<Modal />
					<Navbar />
					<ReduxToastr
						timeOut={3000}
						position='top-center'
						transitionIn='fadeIn'
						transitionOut='fadeOut'
					/>
					<Switch>
						<Route exact path='/' component={Landing} />
						<Route component={Routes} />
					</Switch>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;

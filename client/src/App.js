import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routes/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser, noToken } from './actions/auth';
// CSS
import './App.min.css';
import { setAuthToken } from './utils/utilities';

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
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route component={Routes} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;

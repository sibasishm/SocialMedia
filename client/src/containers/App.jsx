import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

// StyleSheets
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import '../assets/stylesheets/styles.css';

import Navbar from '../components/nav/Navbar';
import Landing from './Landing';
import Routes from './routing';
import Modal from './modal';

// Redux
import {Provider} from 'react-redux';
import store from '../store';
import {getCurrentUser} from '../actions/user';
import {noToken} from '../actions/auth';

import {setAuthToken} from '../utils';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(getCurrentUser());
    } else {
      store.dispatch(noToken());
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Modal />
        <Navbar />
        <ReduxToastr
          timeOut={3000}
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;

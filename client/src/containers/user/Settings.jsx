import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { updateProfile } from '../../actions/profile';

import { updateCurrentUser } from '../../actions/user';

import SideNav from '../../components/settings/SideNav';
import Basics from '../../components/settings/Basics';
import Account from '../../components/settings/Account';
import About from '../../components/settings/About';

const Settings = ({ updateProfile, updateCurrentUser, user: { me } }) => {
  return (
    <Grid columns={2} stackable>
      <Grid.Column width={4}>
        <SideNav />
      </Grid.Column>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route
            path="/settings/basic"
            render={() => <Basics initialValues={me} updateProfile={updateProfile} />}
          />
          <Route
            path="/settings/about"
            render={() => <About initialValues={me} updateProfile={updateProfile} />}
          />
          <Route
            path="/settings/account"
            render={() => <Account initialValues={me} updateUserData={updateCurrentUser} />}
          />
        </Switch>
      </Grid.Column>
    </Grid>
  );
};

Settings.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, {
  updateProfile,
  updateCurrentUser
})(Settings);

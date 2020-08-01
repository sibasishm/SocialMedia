import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';

import { updateUserAvatar } from '../../actions/user';

import Welcome from './Welcome';
import HeroBanner from '../../components/profile/HeroBanner';
import UserInfo from '../../components/profile/UserInfo';
import Placeholder from '../../components/layout/Placeholder';
import Menu from '../../components/profile/Menu';
import Activities from '../../components/profile/Activities';
import About from '../../components/profile/About';
import Topics from '../topics/Posts';
import Spinner from '../../components/layout/Spinner';

const Profile = ({ user: { me, loading }, updateUserAvatar }) => {
  return loading || me === null ? (
    <Spinner />
  ) : !(me.profile && me.profile[0]) ? (
    <Welcome user={me} />
  ) : (
    <div className="profile-container">
      <HeroBanner />
      <Grid columns={2} stackable>
        <Grid.Column width={5}>
          <UserInfo user={me} updateAvatar={updateUserAvatar} />
        </Grid.Column>
        <Grid.Column width={11}>
          <Menu />
          <Segment attached="bottom">
            <Switch>
              <Route exact path="/me" render={() => <Activities />} />
              <Route path="/me/about" render={() => <About profile={me.profile[0]} />} />
              <Route path="/me/network" render={() => <Placeholder />} />
              <Route path="/me/posts" render={() => <Topics isAuthenticated={true} />} />
              <Route path="/me/events" render={() => <Placeholder />} />
              <Route path="/me/photos" render={() => <Placeholder />} />
            </Switch>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  updateUserAvatar: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, { updateUserAvatar })(Profile);

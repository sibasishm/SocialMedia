import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';

import { getProfileById } from '../../actions/profile';

import Welcome from './Welcome';
import HeroBanner from '../../components/profile/HeroBanner';
import UserInfo from '../../components/profile/UserInfo';
import Placeholder from '../../components/layout/Placeholder';
import Menu from '../../components/profile/Menu';
import Activities from '../../components/profile/Activities';
import About from '../../components/profile/About';
import Topics from '../topics/Posts';
import Spinner from '../../components/layout/Spinner';

const Profile = ({
	profile: { me, loading, error },
	auth: { user },
	getProfileById
}) => {
	useEffect(() => {
		user && getProfileById(user._id, true);
	}, [getProfileById, user]);

	return error.status === 404 ? (
		<Welcome user={user} />
	) : loading || me === null ? (
		<Spinner />
	) : (
		<div className='profile-container'>
			<HeroBanner />
			<Grid columns={2} stackable>
				<Grid.Column width={5}>
					<UserInfo user={me} />
				</Grid.Column>
				<Grid.Column width={11}>
					<Menu />
					<Segment attached='bottom'>
						<Switch>
							<Route
								exact
								path='/me'
								render={() => <Activities />}
							/>
							<Route
								path='/me/about'
								render={() => <About profile={me} />}
							/>
							<Route
								path='/me/network'
								render={() => <Placeholder />}
							/>
							<Route
								path='/me/posts'
								render={() => <Topics isAuthenticated={true} />}
							/>
							<Route
								path='/me/events'
								render={() => <Placeholder />}
							/>
							<Route
								path='/me/photos'
								render={() => <Placeholder />}
							/>
						</Switch>
					</Segment>
				</Grid.Column>
			</Grid>
		</div>
	);
};

Profile.propTypes = {
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);

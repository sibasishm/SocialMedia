import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';

import { getProfileById, addFollower } from '../../actions/profile';

import Spinner from '../../components/layout/Spinner';
import HeroBanner from '../../components/profile/HeroBanner';
import UserInfo from '../../components/profile/UserInfo';
import GuestMenu from '../../components/profile/GuestMenu';
import Activities from '../../components/profile/Activities';
import About from '../../components/profile/About';

const Profile = ({
	getProfileById,
	addFollower,
	profile: { current, loading, followerLoading },
	match,
	auth: { user }
}) => {
	const userId = match.params.id;

	useEffect(() => {
		getProfileById(userId);
	}, [getProfileById, userId]);

	if (user && userId === user._id) {
		return <Redirect to='/me' />;
	}

	const isFollowing =
		current &&
		current.followers &&
		current.followers.findIndex(follower => follower.user === user._id) !==
			-1;

	return loading || current === null ? (
		<Spinner />
	) : (
		<div className='profile-container'>
			<HeroBanner />
			<Grid columns={2} stackable>
				<Grid.Column width={5}>
					<UserInfo user={current} />
				</Grid.Column>
				<Grid.Column width={11}>
					<GuestMenu
						userId={userId}
						profileId={current._id}
						follow={addFollower}
						isFollowing={isFollowing}
						loading={followerLoading}
					/>
					<Segment attached='bottom'>
						<Switch>
							<Route
								exact
								path={`/users/${userId}`}
								render={() => <Activities />}
							/>
							<Route
								path={`/users/${userId}/about`}
								render={() => <About profile={current} />}
							/>
						</Switch>
					</Segment>
				</Grid.Column>
			</Grid>
		</div>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	addFollower: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileById, addFollower })(
	Profile
);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid, Segment } from 'semantic-ui-react';

import { getUser } from '../../actions/user';

import Spinner from '../../components/layout/Spinner';
import HeroBanner from '../../components/profile/HeroBanner';
import UserInfo from '../../components/profile/UserInfo';
import GuestMenu from '../../components/profile/GuestMenu';
import Activities from '../../components/profile/Activities';
import About from '../../components/profile/About';

const Profile = ({ getUser, user: { current, me, loading }, match }) => {
	const userId = match.params.id;

	useEffect(() => {
		getUser(userId);
	}, [getUser, userId]);

	if (me && userId === me._id) {
		return <Redirect to='/me' />;
	}

	return loading || current === null ? (
		<Spinner />
	) : !current.profile[0] ? (
		<p>The user doesn't have a profile.</p>
	) : (
		<div className='profile-container'>
			<HeroBanner />
			<Grid columns={2} stackable>
				<Grid.Column width={5}>
					<UserInfo user={current} />
				</Grid.Column>
				<Grid.Column width={11}>
					<GuestMenu userId={userId} />
					<Segment attached='bottom'>
						<Switch>
							<Route
								exact
								path={`/users/${userId}`}
								render={() => <Activities />}
							/>
							<Route
								path={`/users/${userId}/about`}
								render={() => (
									<About profile={current.profile[0]} />
								)}
							/>
						</Switch>
					</Segment>
				</Grid.Column>
			</Grid>
		</div>
	);
};

Profile.propTypes = {
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, { getUser })(Profile);

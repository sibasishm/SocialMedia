import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Grid, Container, Divider, Segment } from 'semantic-ui-react';

import { getProfileById } from '../../actions/profile';

import Spinner from '../../components/layout/Spinner';
import HeroBanner from '../../components/profile/HeroBanner';
import Stats from '../../components/profile/Stats';
import Social from '../../components/profile/Social';
import GuestMenu from '../../components/profile/GuestMenu';
import Activities from '../../components/profile/Activities';
import About from '../../components/profile/About';

const Profile = ({
	getProfileById,
	profile: { current, loading },
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

	return loading || current === null ? (
		<Spinner />
	) : (
		<div className='profile-container'>
			<HeroBanner />
			<Grid columns={2} stackable>
				<Grid.Column width={5}>
					<Container textAlign='center'>
						<img
							className='profile-image'
							src={current.user && current.user.avatar}
							alt='user'
						/>
						<p className='name'>
							{current.user && current.user.name}
						</p>
						<p className='info'>
							{current.user && current.user.email}
						</p>
						<Stats />
						<Divider />
						<p>{current && current.bio}</p>
						<Divider />
						<Social />
					</Container>
				</Grid.Column>
				<Grid.Column width={11}>
					<GuestMenu userId={userId} />
					<Segment attached='bottom'>
						<Switch>
							<Route
								exact
								path={`/people/${userId}`}
								render={() => <Activities />}
							/>
							<Route
								path={`/people/${userId}/about`}
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
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Grid, Container, Divider, Segment } from 'semantic-ui-react';

import { getProfileById } from '../../actions/profile';

import Spinner from '../../components/layout/Spinner';
import HeroBanner from '../../components/profile/HeroBanner';
import Stats from '../../components/profile/Stats';
import Social from '../../components/profile/Social';
import Placeholder from '../../components/layout/Placeholder';
import GuestMenu from '../../components/profile/GuestMenu';
import { Activities } from '../../components/profile/Activities';

const Profile = ({ getProfileById, profile: { current, loading }, match }) => {
	const userId = match.params.id;
	useEffect(() => {
		getProfileById(userId);
	}, [getProfileById, userId]);

	return loading || current === null ? (
		<Spinner />
	) : (
		<div className='profile-container'>
			<HeroBanner />
			<Grid>
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
					<GuestMenu />
					<Segment attached='bottom'>
						<Switch>
							<Route
								exact
								path='/people/:id'
								render={() => <Activities />}
							/>
							<Route
								path='/people/:id/about'
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
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(Profile);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Grid, Container, Divider, Segment } from 'semantic-ui-react';

import { getCurrentProfile } from '../../actions/profile';

import Spinner from '../../components/layout/Spinner';
import HeroBanner from '../../components/profile/HeroBanner';
import Stats from '../../components/profile/Stats';
import Social from '../../components/profile/Social';
import Placeholder from '../../components/layout/Placeholder';
import Menu from '../../components/profile/Menu';
import { Activities } from '../../components/profile/Activities';
import Topics from '../topics/Posts';

const Profile = ({
	getCurrentProfile,
	auth: { user },
	profile: { current, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

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
							src={user && user.avatar}
							alt='user'
						/>
						<p className='name'>{user && user.name}</p>
						<p className='info'>{user && user.email}</p>
						<Stats />
						<Divider />
						<p>{current && current.bio}</p>
						<Divider />
						<Social />
					</Container>
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
								render={() => <Placeholder />}
							/>
							<Route
								path='/me/network'
								render={() => <Placeholder />}
							/>
							<Route
								path='/me/topics'
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
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);

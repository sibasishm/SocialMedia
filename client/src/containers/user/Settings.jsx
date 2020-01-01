import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
	updateProfile,
	getCurrentProfile,
	addExperience,
	addEducation
} from '../../actions/profile';

import SideNav from '../../components/settings/SideNav';
import Basics from '../../components/settings/Basics';
import Photos from '../../components/settings/Photos';
import Account from '../../components/settings/Account';
import About from '../../components/settings/About';
import Education from '../../components/settings/Education';
import Experience from '../../components/settings/Experience';

const Settings = ({
	updateProfile,
	getCurrentProfile,
	addEducation,
	addExperience,
	profile: { current }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);
	return (
		<Grid>
			<Grid.Column width={4}>
				<SideNav />
			</Grid.Column>
			<Grid.Column width={12}>
				<Switch>
					<Redirect exact from='/settings' to='/settings/basic' />
					<Route
						path='/settings/basic'
						render={() => (
							<Basics
								initialValues={current}
								updateProfile={updateProfile}
							/>
						)}
					/>
					<Route
						path='/settings/about'
						render={() => (
							<About
								initialValues={current}
								updateProfile={updateProfile}
							/>
						)}
					/>
					<Route path='/settings/photos' component={Photos} />
					<Route
						path='/settings/account'
						render={() => <Account />}
					/>
					<Route
						path='/settings/education'
						render={() => (
							<Education updateProfile={addEducation} />
						)}
					/>
					<Route
						path='/settings/experience'
						render={() => (
							<Experience updateProfile={addExperience} />
						)}
					/>
				</Switch>
			</Grid.Column>
		</Grid>
	);
};

Settings.propTypes = {
	updateProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	addEducation: PropTypes.func.isRequired,
	addExperience: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, {
	updateProfile,
	getCurrentProfile,
	addExperience,
	addEducation
})(Settings);
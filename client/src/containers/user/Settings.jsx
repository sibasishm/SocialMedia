import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import {
	updateProfile,
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
	addEducation,
	addExperience,
	profile: { me }
}) => {
	return (
		<Grid columns={2} stackable>
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
								initialValues={me}
								updateProfile={updateProfile}
							/>
						)}
					/>
					<Route
						path='/settings/about'
						render={() => (
							<About
								initialValues={me}
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
							<Education
								education={me && me.education}
								updateProfile={addEducation}
							/>
						)}
					/>
					<Route
						path='/settings/experience'
						render={() => (
							<Experience
								experience={me && me.experience}
								updateProfile={addExperience}
							/>
						)}
					/>
				</Switch>
			</Grid.Column>
		</Grid>
	);
};

Settings.propTypes = {
	updateProfile: PropTypes.func.isRequired,
	addEducation: PropTypes.func.isRequired,
	addExperience: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, {
	updateProfile,
	addExperience,
	addEducation
})(Settings);

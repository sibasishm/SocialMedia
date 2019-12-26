import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { updateProfile } from '../../actions/profile';

import SideNav from '../../components/settings/SideNav';
import Basics from '../../components/settings/Basics';
import Photos from '../../components/settings/Photos';
import Account from '../../components/settings/Account';
import About from '../../components/settings/About';

const Settings = ({ updateProfile }) => (
	<Grid>
		<Grid.Column width={6}>
			<SideNav />
		</Grid.Column>
		<Grid.Column width={10}>
			<Switch>
				<Redirect exact from='/settings' to='/settings/basic' />
				<Route
					path='/settings/basic'
					render={() => <Basics updateProfile={updateProfile} />}
				/>
				<Route
					path='/settings/about'
					render={() => <About updateProfile={updateProfile} />}
				/>
				<Route path='/settings/photos' component={Photos} />
				<Route path='/settings/account' render={() => <Account />} />
			</Switch>
		</Grid.Column>
	</Grid>
);

Settings.propTypes = {
	updateProfile: PropTypes.func.isRequired
};

export default connect(null, { updateProfile })(Settings);

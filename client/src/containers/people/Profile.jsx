import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

import Spinner from '../../components/layout/Spinner';

const Profile = ({
	getCurrentProfile,
	auth: { user },
	profile: { current, loading }
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && current === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1>Welcome {user && user.name}</h1>
		</Fragment>
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

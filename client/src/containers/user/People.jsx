import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { getProfiles } from '../../actions/profile';
import Spinner from '../../components/layout/Spinner';
import UserCard from '../../components/profile/UserCard';

const People = ({ getProfiles, profile: { all, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);
	return loading ? (
		<Spinner />
	) : (
		<Grid>
			{all &&
				all.map((profile, index) => (
					<Grid.Column stretched mobile={16} tablet={8} computer={4}>
						<UserCard key={index} profile={profile} />
					</Grid.Column>
				))}
		</Grid>
	);
};

People.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(People);

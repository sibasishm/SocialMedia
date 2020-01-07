import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

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
		<Card.Group itemsPerRow={4}>
			{all &&
				all.map((profile, index) => (
					<UserCard key={index} profile={profile} />
				))}
		</Card.Group>
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

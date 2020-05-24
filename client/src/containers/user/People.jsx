import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { getAllUsers } from '../../actions/user';
import Spinner from '../../components/layout/Spinner';
import UserCard from '../../components/profile/UserCard';

const People = ({ getAllUsers, user: { all, loading } }) => {
	useEffect(() => {
		getAllUsers();
	}, [getAllUsers]);

	return loading ? (
		<Spinner />
	) : (
		<Grid>
			{all &&
				all.map((user, index) => (
					<Grid.Column
						key={index}
						stretched
						mobile={16}
						tablet={8}
						computer={4}
					>
						<UserCard user={user} />
					</Grid.Column>
				))}
		</Grid>
	);
};

People.propTypes = {
	getAllUsers: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, { getAllUsers })(People);

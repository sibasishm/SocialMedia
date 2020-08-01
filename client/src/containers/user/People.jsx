import React from 'react';
import { useQuery } from 'react-query';
import { Grid } from 'semantic-ui-react';

import { getAllUsers } from '../../apis/users';
import Spinner from '../../components/layout/Spinner';
import UserCard from '../../components/profile/UserCard';

const People = () => {
	const { status, data, error } = useQuery('users', getAllUsers);

	return status === 'loading' ? (
		<Spinner />
	) : status === 'error' ? (
		<p>Some error occured. {error.message}</p>
	) : (
		<Grid>
			{data.data.map((user) => (
				<Grid.Column
					key={user.id}
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

export default People;

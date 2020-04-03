import React from 'react';
import { Container, Divider } from 'semantic-ui-react';

import Stats from '../profile/Stats';
import Social from '../profile/Social';

const UserInfo = ({ user = {} }) => {
	return (
		<Container textAlign='center'>
			<img
				className='profile-image'
				src={user.user && user.user.avatar}
				alt='user'
			/>
			<p className='name'>
				{user.user &&
					`${user.user.firstName} ${user.user.lastName || ''}`}
			</p>
			<p className='info'>{user.user && user.user.email}</p>
			<Stats followers={user.followers} />
			<Divider />
			<p>
				{(user && user.bio) ||
					'The user likes to keep a mystery about himself.'}
			</p>
			<Divider />
			<Social user={user} />
		</Container>
	);
};

export default UserInfo;

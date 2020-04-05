import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';

export default ({ userId, follow, profileId, isFollowing, loading }) => {
	return (
		<Menu attached='top' tabular>
			<Menu.Item as={NavLink} exact to={`/users/${userId}`}>
				Activities
			</Menu.Item>
			<Menu.Item as={NavLink} to={`/users/${userId}/about`}>
				About
			</Menu.Item>
			<Menu.Menu position='right'>
				<Menu.Item>
					<Button
						content={isFollowing ? 'Unfollow' : 'Follow'}
						basic={isFollowing}
						positive={!isFollowing}
						loading={loading}
						onClick={() => follow(profileId)}
					/>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

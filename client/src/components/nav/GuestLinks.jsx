import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';

const GuestLinks = () => (
	<Menu.Menu position='right'>
		<Menu.Item as={NavLink} to='/login' content='Sign in' />
		<Menu.Item>
			<Button
				as={Link}
				to='/register'
				color='teal'
				content='Get started'
			/>
		</Menu.Item>
	</Menu.Menu>
);

export default GuestLinks;

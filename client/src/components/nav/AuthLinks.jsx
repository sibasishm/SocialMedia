import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown } from 'semantic-ui-react';

const AuthLinks = ({ logout, userDetails: { name, avatar } }) => (
	<Menu.Item position='right'>
		{avatar && <Image avatar spaced='right' src={avatar} />}
		<Dropdown pointing='top right' text={name}>
			<Dropdown.Menu>
				<Dropdown.Item text='Create Event' icon='plus' />
				<Dropdown.Item text='My Events' icon='calendar' />
				<Dropdown.Item text='My Topics' icon='chat' />
				<Dropdown.Item text='My Network' icon='users' />
				<Dropdown.Item
					as={Link}
					to='/settings'
					text='Settings'
					icon='settings'
				/>
				<Dropdown.Item
					as={Link}
					to='/'
					text='Sign Out'
					icon='power'
					onClick={logout}
				/>
			</Dropdown.Menu>
		</Dropdown>
	</Menu.Item>
);

export default AuthLinks;

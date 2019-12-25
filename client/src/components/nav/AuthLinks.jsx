import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { logout } from '../../actions/auth';

const AuthLinks = ({ logout, name, avatar }) => (
	<Menu.Item position='right'>
		{avatar && <Image avatar spaced='right' src={avatar} />}
		<Dropdown pointing='top right' text={name}>
			<Dropdown.Menu>
				<Dropdown.Item text='Create Event' icon='plus' />
				<Dropdown.Item text='My Events' icon='calendar' />
				<Dropdown.Item text='My Topics' icon='chat' />
				<Dropdown.Item text='My Network' icon='users' />
				<Dropdown.Item text='My Profile' icon='user' />
				<Dropdown.Item
					as={Link}
					to='/settings'
					text='Settings'
					icon='settings'
				/>
				<Dropdown.Item
					as={Link}
					to='/login'
					text='Sign Out'
					icon='power'
					onClick={logout}
				/>
			</Dropdown.Menu>
		</Dropdown>
	</Menu.Item>
);

AuthLinks.propTypes = {
	logout: PropTypes.func.isRequired,
	name: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
	name: state.auth.user ? state.auth.user.name : 'User Name',
	avatar: state.auth.user ? state.auth.user.avatar : ''
});

export default connect(mapStateToProps, { logout })(AuthLinks);

import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Container } from 'semantic-ui-react';

import GuestLinks from './GuestLinks';
import AuthLinks from './AuthLinks';

import { openModal } from '../../actions/modal';
import { logout } from '../../actions/auth';

const makeUserInfo = user => ({
	name: user ? user.firstName : 'User name',
	avatar: user && user.avatar ? user.avatar : ''
});

const Navbar = ({
	auth: { isAuthenticated, loading, user },
	openModal,
	logout
}) => (
	<Menu pointing secondary size='large'>
		<Container>
			<Menu.Item header as={NavLink} exact to='/' name='Mitroon' />
			{/* <Menu.Item as={NavLink} to='/events' name='Events' /> */}
			<Menu.Item as={NavLink} to='/topics' name='Topics' />
			<Menu.Item as={NavLink} to='/people' name='People' />
			{!loading &&
				(isAuthenticated ? (
					<AuthLinks
						logout={logout}
						userDetails={makeUserInfo(user)}
					/>
				) : (
					<GuestLinks
						signIn={() => openModal('Login')}
						register={() => openModal('Register')}
					/>
				))}
		</Container>
	</Menu>
);

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	openModal: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { openModal, logout })(Navbar);

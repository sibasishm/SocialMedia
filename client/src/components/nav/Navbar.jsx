import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Container } from 'semantic-ui-react';

import GuestLinks from './GuestLinks';
import AuthLinks from './AuthLinks';

import { openModal } from '../../actions/modal';
import { logout } from '../../actions/auth';

const Navbar = ({
	auth: { isAuthenticated, loading },
	user: { me },
	openModal,
	logout,
}) => (
	<Menu pointing secondary size='large'>
		<Container>
			<Menu.Item header as={NavLink} exact to='/' name='Mitroon' />
			{/* <Menu.Item as={NavLink} to='/events' name='Events' /> */}
			<Menu.Item as={NavLink} to='/posts' name='Posts' />
			<Menu.Item as={NavLink} to='/users' name='Users' />
			{!loading &&
				(isAuthenticated ? (
					me && <AuthLinks logout={logout} userDetails={me} />
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
	user: PropTypes.object.isRequired,
	openModal: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps, { openModal, logout })(Navbar);

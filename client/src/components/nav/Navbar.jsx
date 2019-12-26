import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Container } from 'semantic-ui-react';

import GuestLinks from './GuestLinks';
import AuthLinks from './AuthLinks';

import { openModal } from '../../actions/modal';
import { logout } from '../../actions/auth';

const Navbar = ({ isAuthenticated, loading, user, openModal, logout }) => {
	const handleSignIn = () => {
		openModal('Auth');
	};

	const handleRegister = () => {
		openModal('Register');
	};

	return (
		<Menu pointing secondary size='large'>
			<Container>
				<Menu.Item header as={NavLink} exact to='/' name='Socialize' />
				<Menu.Item as={NavLink} to='/events' name='Events' />
				<Menu.Item as={NavLink} to='/topics' name='Topics' />
				<Menu.Item as={NavLink} to='/people' name='People' />
				{!loading &&
					(isAuthenticated ? (
						<AuthLinks logout={logout} userDetails={user} />
					) : (
						<GuestLinks
							signIn={handleSignIn}
							register={handleRegister}
						/>
					))}
			</Container>
		</Menu>
	);
};

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool,
	user: PropTypes.object,
	openModal: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading,
	user: {
		name: state.auth.user ? state.auth.user.name : 'User Name',
		avatar: state.auth.user ? state.auth.user.avatar : ''
	}
});

export default connect(mapStateToProps, { openModal, logout })(Navbar);

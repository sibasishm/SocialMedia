import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Container } from 'semantic-ui-react';

import GuestLinks from './GuestLinks';
import AuthLinks from './AuthLinks';

const Navbar = ({ isAuthenticated, loading }) => (
	<Menu pointing secondary size='large'>
		<Container>
			<Menu.Item header as={NavLink} exact to='/' name='Socialize' />
			<Menu.Item as={NavLink} to='/profile' name='People' />
			<Menu.Item as={NavLink} to='/events' name='Event' />
			{!loading && (isAuthenticated ? <AuthLinks /> : <GuestLinks />)}
		</Container>
	</Menu>
);

Navbar.propTypes = {
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	loading: state.auth.loading
});

export default connect(mapStateToProps)(Navbar);

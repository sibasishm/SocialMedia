import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Button } from 'semantic-ui-react';
import { openModal } from '../../actions/modal';

const Landing = ({ isAuthenticated, openModal }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	const handleRegister = () => {
		openModal('Register');
	};

	return (
		<Container text>
			<Header
				as='h1'
				content='Socialize'
				subheader='The journey of a million miles begin with a single step.'
			/>
			<Button
				size='large'
				color='teal'
				content='Get started'
				onClick={handleRegister}
			/>
		</Container>
	);
};

Landing.prototype = {
	isAuthenticated: PropTypes.bool,
	openModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { openModal })(Landing);

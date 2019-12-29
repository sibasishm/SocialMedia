import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Button } from 'semantic-ui-react';
import { openModal } from '../../actions/modal';

const Landing = ({ auth: { isAuthenticated }, openModal }) => {
	if (isAuthenticated) {
		return <Redirect to='/me' />;
	}

	const handleRegister = () => {
		openModal('Register');
	};

	return (
		<Container text textAlign='center'>
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
	auth: PropTypes.object.isRequired,
	openModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { openModal })(Landing);

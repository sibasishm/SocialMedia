import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Button } from 'semantic-ui-react';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<Container text>
			<Header
				as='h1'
				content='Socialize'
				subheader='The journey of a million miles begin with a single step.'
			/>
			<Button
				as={Link}
				to='/register'
				size='large'
				color='teal'
				content='Get started'
			/>
		</Container>
	);
};

Landing.prototype = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);

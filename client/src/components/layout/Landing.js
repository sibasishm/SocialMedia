import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<header className='landing'>
			<div className='landing-inner'>
				<h1 className='landing-inner-text'>
					<span className='x-large'>Socialize</span>
					<span className='lead'>
						Rest of the world is just a click away
					</span>
				</h1>
				<Link to='/register' className='btn btn-light my-1'>
					Get started
				</Link>
			</div>
		</header>
	);
};

Landing.prototype = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);

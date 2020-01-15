import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Spinner from '../../components/layout/Spinner';
import { openModal } from '../../actions/modal';

const PrivateRoute = ({
	component: Component,
	auth: { isAuthenticated, loading },
	openModal,
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			!loading ? (
				!isAuthenticated ? (
					openModal('Unauth')
				) : (
					<Component {...props} />
				)
			) : (
				<Spinner />
			)
		}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired,
	openModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { openModal })(PrivateRoute);

import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput } from '../input/SimpleInput';
import { login } from '../../actions/auth';
import { required, email } from '../../utils/formValidators';

const Login = ({ login, auth: { isAuthenticated }, handleSubmit }) => {
	if (isAuthenticated) {
		return <Redirect to='/me' />;
	}

	return (
		<Form
			error
			size='large'
			onSubmit={handleSubmit(login)}
			autoComplete='off'
		>
			<Field
				name='email'
				component={SimpleInput}
				type='email'
				placeholder='Your email'
				icon='mail'
				validate={[required, email]}
			/>
			<Field
				name='password'
				component={SimpleInput}
				type='password'
				placeholder='Your password'
				icon='key'
				validate={required}
			/>
			<Button fluid size='medium' color='teal'>
				Sign in
			</Button>
		</Form>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { login })(
	reduxForm({ form: 'login' })(Login)
);

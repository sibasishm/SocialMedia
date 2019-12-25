import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput } from '../input/SimpleInput';
import { login } from '../../actions/auth';
import { required, email } from '../../utils/formValidators';

const Login = ({ login, isAuthenticated, handleSubmit }) => {
	const onFormSubmit = formData => {
		login(formData);
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Form
			error
			size='large'
			onSubmit={handleSubmit(onFormSubmit)}
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
	isAuthenticated: PropTypes.bool,
	handleSubmit: PropTypes.func
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(
	reduxForm({ form: 'login' })(Login)
);

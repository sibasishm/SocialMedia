import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput } from '../input/SimpleInput';
import { register } from '../../actions/auth';
import {
	required,
	email,
	minLength6,
	notGmail,
	matchPasswords
} from '../../utils/formValidators';

const Register = ({ register, isAuthenticated, handleSubmit }) => {
	const onFormSubmit = formData => {
		if (formData.password !== formData.confirmPassword) {
			console.error("Passowrds don't match!", 'HANDLE');
		} else {
			register(formData);
		}
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
				name='name'
				component={SimpleInput}
				type='text'
				placeholder='Your user name'
				icon='user'
				validate={required}
			/>
			<Field
				name='email'
				component={SimpleInput}
				type='email'
				placeholder='Your email'
				icon='mail'
				validate={[required, email]}
				warn={notGmail}
			/>
			<Field
				name='password'
				component={SimpleInput}
				type='password'
				placeholder='Your password'
				icon='key'
				validate={[required, minLength6]}
			/>
			<Field
				name='confirmPassword'
				component={SimpleInput}
				type='password'
				placeholder='Repeat your password'
				icon='key'
				validate={[required, matchPasswords]}
			/>
			<Button fluid size='medium' color='teal'>
				Sign up
			</Button>
		</Form>
	);
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	handleSubmit: PropTypes.func
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {
	register
})(reduxForm({ form: 'register' })(Register));

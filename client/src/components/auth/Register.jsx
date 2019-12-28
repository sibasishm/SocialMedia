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

const Register = ({ register, auth: { isAuthenticated }, handleSubmit }) => {
	if (isAuthenticated) {
		return <Redirect to='/me' />;
	}

	return (
		<Form
			error
			size='large'
			onSubmit={handleSubmit(register)}
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
	auth: PropTypes.object.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {
	register
})(reduxForm({ form: 'register' })(Register));

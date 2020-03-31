import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput } from '../input/SimpleInput';
import { register } from '../../actions/auth';
import {
	required,
	email,
	minLength8,
	notGmail,
	matchPasswords,
	strongPassword
} from '../../utils/formValidators';

const Register = ({ register, handleSubmit }) => (
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
			validate={[required, minLength8]}
			warn={strongPassword}
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

Register.propTypes = {
	register: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired
};

export default connect(null, {
	register
})(reduxForm({ form: 'register' })(Register));

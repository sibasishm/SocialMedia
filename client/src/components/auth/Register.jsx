import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Segment, Button, Header } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput } from '../input/SimpleInput';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated, formData }) => {
	const onFormSubmit = e => {
		e.preventDefault();
		// if (password !== confirmPassword) {
		// 	setAlert("Passowrds don't match!", 'danger');
		// } else {
		register(formData);
		// }
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Form error size='large' onSubmit={e => onFormSubmit(e)}>
			<Segment>
				<Field
					name='name'
					component={SimpleInput}
					type='text'
					placeholder='Your user name'
					icon='user'
				/>
				<Field
					name='email'
					component={SimpleInput}
					type='email'
					placeholder='Your email'
					icon='mail'
				/>
				<Field
					name='password'
					component={SimpleInput}
					type='password'
					placeholder='Your password'
					icon='key'
				/>
				<Field
					name='confirmPassword'
					component={SimpleInput}
					type='password'
					placeholder='Repeat your password'
					icon='key'
				/>
				<Button fluid size='medium' color='teal'>
					Sign up
				</Button>
				<Header size='tiny'>
					<span>Already have an account? </span>
					<span>
						<Link to='/register'>Sign in</Link>
					</span>
				</Header>
			</Segment>
		</Form>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	formData: PropTypes.object
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	formData: state.form.register && state.form.register.values
});

export default connect(mapStateToProps, {
	setAlert,
	register
})(reduxForm({ form: 'register' })(Register));

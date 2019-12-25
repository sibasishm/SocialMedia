import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Segment, Button, Header } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { SimpleInput } from '../input/SimpleInput';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, formData }) => {
	const onFormSubmit = e => {
		e.preventDefault();
		login(formData);
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Form error size='large' onSubmit={e => onFormSubmit(e)}>
			<Segment>
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
				<Button fluid size='medium' color='teal'>
					Sign in
				</Button>
				<Header size='tiny'>
					<span>No account? </span>
					<span>
						<Link to='/register'>Create one</Link>
					</span>
				</Header>
			</Segment>
		</Form>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
	formData: PropTypes.object
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	formData: state.form.login && state.form.login.values
});

export default connect(mapStateToProps, { login })(
	reduxForm({ form: 'login' })(Login)
);

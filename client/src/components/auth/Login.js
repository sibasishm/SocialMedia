import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onInputChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onFormSubmit = e => {
		e.preventDefault();
		login({ email, password });
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div className='mt-1'>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>Welcome back. Get, Set, Socialize!</p>
			<form className='form' onSubmit={e => onFormSubmit(e)}>
				<div className='form-group icon-input'>
					<i className='fas fa-envelope'></i>
					<input
						type='email'
						placeholder='Your Email'
						id='email'
						name='email'
						value={email}
						onChange={e => onInputChange(e)}
						required
					/>
				</div>
				<div className='form-group icon-input'>
					<i className='fas fa-unlock'></i>
					<input
						type='password'
						placeholder='Password'
						name='password'
						id='password'
						value={password}
						onChange={e => onInputChange(e)}
						minLength='6'
					/>
				</div>
				<input
					type='submit'
					value='Login'
					className='btn btn-primary'
				/>
			</form>
			<p className='my-1'>
				<Link to='/register'>Create an account</Link>
			</p>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);

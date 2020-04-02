import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE,
	NO_TOKEN
} from './types';
import { closeModal } from './modal';

import { setAuthToken } from '../utils';

// Set x-auth-token in axios defaults header
// Get user data from /api/auth and set to payload
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

export const noToken = () => dispatch => {
	dispatch({
		type: NO_TOKEN
	});
};

// payload has token only
export const register = params => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	delete params['confirmPassword'];
	const body = JSON.stringify(params);

	try {
		const res = await axios.post('/api/users', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());

		dispatch(closeModal());
		toastr.success('Welcome', 'Registered successfully!');
	} catch (err) {
		const errors = err.response.data.errors;
		dispatch(closeModal());

		if (errors) {
			errors.forEach(error => toastr.error(error.msg));
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};

// payload has token only
export const login = ({ email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post('/api/auth', body, config);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());

		dispatch(closeModal());
		toastr.success('Welcome back', 'Signed in successfully!');
	} catch (err) {
		const errors = err.response.data.errors;
		dispatch(closeModal());

		if (errors) {
			errors.forEach(error => toastr.error(error.msg));
		}

		dispatch({
			type: LOGIN_FAIL
		});
	}
};

export const logout = () => dispatch => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
};

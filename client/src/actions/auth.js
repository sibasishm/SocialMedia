import axios from 'axios';

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
import { setAlert } from './alert';

import { setAuthToken } from '../utils/utilities';

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
export const register = ({ name, email, password }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post('/api/users', body, config);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());

		dispatch(setAlert('Registered successfully!', 'success', 4000));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error =>
				dispatch(setAlert(error.msg, 'danger', 3000))
			);
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

		dispatch(setAlert('Logged in successfully!', 'success', 4000));
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error =>
				dispatch(setAlert(error.msg, 'danger', 3000))
			);
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

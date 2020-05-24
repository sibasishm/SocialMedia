import axios from 'axios';

import { USER_LOADED, AUTH_ERROR, GET_USERS, GET_USER } from './types';
import routesConfig from './routesConfig';
import { setAuthToken } from '../utils';

export const getCurrentUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get(`${routesConfig.users}/me`);

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

export const getAllUsers = () => async (dispatch) => {
	try {
		const res = await axios.get(`${routesConfig.users}`);

		dispatch({
			type: GET_USERS,
			payload: res.data,
		});
	} catch (err) {}
};

export const getUser = (userId) => async (dispatch) => {
	const res = await axios.get(`${routesConfig.users}/${userId}`);

	dispatch({
		type: GET_USER,
		payload: res.data,
	});
};

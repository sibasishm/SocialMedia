import axios from 'axios';
import { toastr } from 'react-redux-toastr';

import {
	USER_LOADED,
	AUTH_ERROR,
	GET_USERS,
	GET_USER,
	UPDATE_USER,
} from './types';
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

export const updateCurrentUser = (formData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const res = await axios.patch(`${routesConfig.users}/me`, formData, config);

	dispatch({
		type: UPDATE_USER,
		payload: res.data,
	});

	toastr.info('User data updated.');
};

export const updateUserAvatar = (file) => async (dispatch) => {
	const formData = new FormData();

	formData.append('avatar', file);

	const res = await axios.patch(
		`${routesConfig.users}/updateAvatar`,
		formData
	);

	dispatch({
		type: UPDATE_USER,
		payload: res.data,
	});
};

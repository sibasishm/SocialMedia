import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import {
	GET_PROFILE,
	GET_MY_PROFILE,
	GET_PROFILES,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE
} from './types';

// Logged in user's profile (token set in local storage)
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profiles/me');
		dispatch({
			type: GET_MY_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({ type: CLEAR_PROFILE });

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// All profiles
export const getProfiles = () => async dispatch => {
	try {
		// Whenever user navigates to all topics or all users page clear his profile in store
		dispatch({ type: CLEAR_PROFILE });

		const res = await axios.get('/api/profiles');
		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Any user profile from userId
export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profiles/user/${userId}`);
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Get OR Update profile data
export const updateProfile = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post('/api/profiles', formData, config);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		toastr.info('Profile updated');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => toastr.error(error.msg));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Add experience
export const addExperience = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.put(
			'/api/profiles/experience',
			formData,
			config
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});

		toastr.success('Success!', 'A new experience added');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => toastr.error(error.msg));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Add experience
export const addEducation = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.put(
			'/api/profiles/education',
			formData,
			config
		);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		});
		toastr.success('Success!', 'A new education added');
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => toastr.error(error.msg));
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

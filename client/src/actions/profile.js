import axios from 'axios';
import { toastr } from 'react-redux-toastr';
import { GET_PROFILE, PROFILE_ERROR } from './types';

export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profiles/me');
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

// Update profile data
export const updateProfile = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post('/api/profiles', formData, config);

		dispatch({
			type: GET_PROFILE,
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

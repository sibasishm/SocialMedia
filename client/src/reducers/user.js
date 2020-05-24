import { USER_LOADED, AUTH_ERROR, GET_USERS, GET_USER } from '../actions/types';

const initialState = {
	current: null,
	me: null,
	all: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				loading: false,
				error: {},
				current: null,
				me: payload.data,
			};
		case GET_USERS:
			return {
				...state,
				loading: false,
				error: {},
				current: null,
				all: payload.data,
			};
		case GET_USER:
			return {
				...state,
				loading: false,
				error: {},
				current: payload.data,
			};
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				loading: false,
				me: null,
				error: payload,
			};
		default:
			return state;
	}
}

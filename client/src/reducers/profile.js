import {
	GET_PROFILE,
	GET_MY_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	GET_PROFILES,
	UPDATE_PROFILE
} from '../actions/types';

const initialState = {
	current: null,
	me: null,
	all: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_PROFILE:
			return {
				...state,
				current: payload,
				loading: false
			};
		case GET_MY_PROFILE:
			return {
				...state,
				me: payload,
				loading: false
			};
		case UPDATE_PROFILE:
			return {
				...state,
				me: state.me ? { ...state.me, ...payload } : payload,
				loading: false
			};
		case GET_PROFILES:
			return {
				...state,
				all: payload,
				loading: false
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case CLEAR_PROFILE:
			return {
				...state,
				current: null,
				me: null,
				loading: false
			};
		default:
			return state;
	}
}

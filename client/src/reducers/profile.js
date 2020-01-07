import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	GET_PROFILES,
	UPDATE_PROFILE
} from '../actions/types';

const initialState = {
	current: null,
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
		case UPDATE_PROFILE:
			return {
				...state,
				current: state.current
					? { ...state.current, ...payload }
					: payload,
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
				loading: false
			};
		default:
			return state;
	}
}

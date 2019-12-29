import { GET_POST, GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
	all: [],
	current: null,
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_POST:
			return {
				...state,
				current: payload,
				loading: false
			};
		case GET_POSTS:
			return {
				...state,
				all: payload,
				loading: false
			};
		case POST_ERROR:
			return {
				...state,
				current: null,
				error: payload
			};
		default:
			return state;
	}
}

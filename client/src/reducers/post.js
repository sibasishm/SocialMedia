import {
	GET_POST,
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES
} from '../actions/types';

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
		case UPDATE_LIKES:
			return {
				...state,
				all: state.all.map(post =>
					post._id === payload.id
						? { ...post, likes: payload.likes }
						: post
				),
				loading: false
			};
		default:
			return state;
	}
}

import {
	GET_POST,
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	GET_MY_POSTS,
	DELETE_POST,
	ADD_POST,
	ADD_COMMENT,
	DELETE_COMMENT
} from '../actions/types';

const initialState = {
	all: [],
	mine: [],
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
		case ADD_POST:
			return {
				...state,
				all: [payload, ...state.all],
				mine: [payload, ...state.mine],
				loading: false
			};
		case GET_POSTS:
			return {
				...state,
				all: payload,
				current: null,
				loading: false
			};
		case GET_MY_POSTS:
			return {
				...state,
				mine: payload,
				current: null,
				loading: false
			};
		case POST_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case UPDATE_LIKES:
			return {
				...state,
				all: state.all.map(post =>
					post._id === payload.id
						? { ...post, likes: payload.likes }
						: post
				),
				mine: state.mine.map(post =>
					post._id === payload.id
						? { ...post, likes: payload.likes }
						: post
				),
				loading: false
			};
		case ADD_COMMENT:
			return {
				...state,
				current: { ...state.current, comments: payload },
				loading: false
			};
		case DELETE_COMMENT:
			return {
				...state,
				current: {
					...state.current,
					comments: state.current.comments.filter(
						comment => comment._id !== payload
					)
				},
				loading: false
			};
		case DELETE_POST:
			return {
				...state,
				all: state.all.filter(post => post._id !== payload),
				mine: state.mine.filter(post => post._id !== payload),
				loading: false
			};
		default:
			return state;
	}
}

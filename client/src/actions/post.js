import { GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';
import axios from 'axios';

// Get all posts
export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts');
		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Add like
export const addLike = id => async dispatch => {
	try {
		const res = await axios.put(`/api/posts/like/${id}`);
		dispatch({
			type: UPDATE_LIKES,
			payload: { id, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

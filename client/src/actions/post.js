import {
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	GET_MY_POSTS,
	DELETE_POST,
	ADD_POST,
	GET_POST,
	ADD_COMMENT,
	DELETE_COMMENT
} from './types';
import axios from 'axios';
import { toastr } from 'react-redux-toastr';

const triggerToastr = err =>
	toastr.error(
		err.response.data ? err.response.data.msg : 'Some error occured!'
	);

// Get all posts
export const getPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts');
		dispatch({
			type: GET_POSTS,
			payload: res.data
		});
	} catch (err) {
		triggerToastr(err);
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Get selected post
export const getPost = id => async dispatch => {
	try {
		const res = await axios.get(`/api/posts/${id}`);
		dispatch({
			type: GET_POST,
			payload: res.data
		});
	} catch (err) {
		triggerToastr(err);
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Get my posts
export const getMyPosts = () => async dispatch => {
	try {
		const res = await axios.get('/api/posts/me');
		dispatch({
			type: GET_MY_POSTS,
			payload: res.data
		});
	} catch (err) {
		triggerToastr(err);
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
		triggerToastr(err);
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Add post
export const addPost = formData => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post(`/api/posts`, formData, config);

		dispatch({
			type: ADD_POST,
			payload: res.data
		});

		toastr.success('Success', 'A new Post is added');
	} catch (err) {
		triggerToastr(err);
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Delete post
export const deletePost = id => dispatch => {
	try {
		const toasteConfirmActions = {
			onOk: async () => {
				await axios.delete(`/api/posts/${id}`);
				dispatch({
					type: DELETE_POST,
					payload: id
				});
				toastr.info('Post removed');
			},
			onCancel: () => {}
		};
		toastr.confirm(
			'Are you sure you want to delete this post?',
			toasteConfirmActions
		);
	} catch (err) {
		triggerToastr(err);
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Add post
export const addComment = (postId, formData) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const res = await axios.post(
			`/api/posts/comments/${postId}`,
			formData,
			config
		);

		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		});

		toastr.success('Success', 'Comment added');
	} catch (err) {
		triggerToastr(err);
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

// Delete post
export const deleteComment = (postId, commentId) => async dispatch => {
	try {
		await axios.delete(`/api/posts/comments/${postId}/${commentId}`);
		dispatch({
			type: DELETE_COMMENT,
			payload: commentId
		});

		toastr.info('Comment removed');
	} catch (err) {
		triggerToastr(err);
		dispatch({
			type: POST_ERROR,
			payload: {
				msg: err.response.statusText,
				status: err.response.status
			}
		});
	}
};

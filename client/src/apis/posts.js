import axios from 'axios';

import routes from './routesConfig';

export const getAllPosts = async () => {
	const { data } = await axios.get(`${routes.posts}`);
	return data;
};

export const getMyPosts = async () => {
	const { data } = await axios.get(`${routes.posts}/me`);
	return data;
};

export const getAPost = async (key, id) => {
	const { data } = await axios.get(`${routes.posts}/${id}`);
	return data;
};

export const addAComment = (text, postId) =>
	axios.post(`/api/posts/${postId}/comments`, { text });

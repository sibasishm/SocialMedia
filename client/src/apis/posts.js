import axios from 'axios';

import routes from './routesConfig';

export const getAllPosts = async () => {
	const { data } = await axios.get(`${routes.posts}`);
	return data;
};

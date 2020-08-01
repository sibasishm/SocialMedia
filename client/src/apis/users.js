import axios from 'axios';

import routes from './routesConfig';

export const getAllUsers = async () => {
  const { data } = await axios.get(`${routes.users}`);
  return data;
};

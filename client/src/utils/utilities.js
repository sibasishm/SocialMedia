import axios from 'axios';

const utilities = {};

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}
utilities.setAuthToken = setAuthToken;

export default utilities;
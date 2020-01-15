import axios from 'axios';
import { format, parseISO } from 'date-fns';

export const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export const formatDate = (date, formatter = 'dd MMM yyyy') => {
	if (!date) {
		return '';
	}
	return format(parseISO(date), formatter);
};

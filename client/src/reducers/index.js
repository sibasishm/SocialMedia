import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as toastr } from 'react-redux-toastr';
import auth from './auth';
import profile from './profile';
import modal from './modal';
import post from './post';

export default combineReducers({
	toastr,
	auth,
	profile,
	form,
	modal,
	post
});

import axios from 'axios';
import {toastr} from 'react-redux-toastr';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  NO_TOKEN,
} from './types';
import {closeModal} from './modal';
import {getCurrentUser} from './user';
import routesConfig from './routesConfig';

export const noToken = () => dispatch => {
  dispatch({
    type: NO_TOKEN,
  });
};

// payload has token only
export const signup = params => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  delete params['confirmPassword'];
  const body = JSON.stringify(params);

  try {
    const res = await axios.post(`${routesConfig.users}/signup`, body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(getCurrentUser());

    dispatch(closeModal());
    toastr.success('Welcome', 'Registered successfully!');
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(closeModal());

    if (errors) {
      errors.forEach(error => toastr.error(error.msg));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// payload has token only
export const login = ({email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({email, password});

  try {
    const res = await axios.post(`${routesConfig.users}/login`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(getCurrentUser());

    dispatch(closeModal());
    toastr.success('Welcome back', 'Signed in successfully!');
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(closeModal());

    if (errors) {
      errors.forEach(error => toastr.error(error.msg));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({type: CLEAR_PROFILE});
  dispatch({type: LOGOUT});
};

import {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from '../actionTypes';
import { uiStartLoading, uiStopLoading } from './loader';
import { addAlert } from './alert';

import { loginAPI } from '../../services/api';

const loginBegin = () => {
  return {
    type: LOGIN_BEGIN
  };
};

const loginSuccess = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return {
    type: LOGIN_SUCCESS,
    token: token,
    user: user
  };
};

const loginFailed = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');

  return {
    type: LOGIN_FAILED
  };
};

export const login = data => {
  return async dispatch => {
    try {
      dispatch(loginBegin());
      dispatch(uiStartLoading());

      const response = await loginAPI(data);
      
      dispatch(uiStopLoading());

      if (response.status) {
        dispatch(loginSuccess(response.data));
      } else {
        dispatch(loginFailed(response.message));
        dispatch(addAlert({message: response.message, type: 'error'}));
      }
    } catch(err) {
      dispatch(loginFailed(err));
      dispatch(addAlert({message: err.message, type: 'error'}));
      dispatch(uiStopLoading());
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(loginFailed());
  };
};

export const saveAuth = kc => {
  return async dispatch => {
    kc.loadUserInfo().success(user => {
      const token = kc.token;
      user.id = user.sub;

      dispatch(loginSuccess(token, user));
    });
  }
}

export const autoLogIn = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      dispatch(loginSuccess(token, user)); 
    } else {
      dispatch(loginFailed());
    }
  };
};
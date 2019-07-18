import { CLIENT_SUCCESS, CLIENT_FAILED } from '../actionTypes';
import { uiStartLoading, uiStopLoading } from './loader';
import { uiStartAlert } from './alert';

import { fetchClientsAPI, fetchClientAPI, saveClientAPI } from '../../services/api';

const clientsSuccess = data => {
  return {
    type: CLIENT_SUCCESS,
    payload: data
  };
};

const clientsFailed = error => {
  return {
    type: CLIENT_FAILED,
    error: error
  };
};

export const fetchClients = () => {
  return async dispatch => {
    try {
      dispatch(uiStartLoading());

      const response = await fetchClientsAPI();

      dispatch(uiStopLoading());

      if (response.status) {
        dispatch(clientsSuccess(response.data));
      } else {
        dispatch(clientsFailed(response.message));
        dispatch(uiStartAlert(response.message, 'danger'));
      }
    } catch (err) {
      dispatch(clientsFailed(err));
      dispatch(uiStartAlert(err, 'danger'));
    }
  };
};

export const fetchClient = (id) => {
  return async dispatch => {
    try {
      dispatch(uiStartLoading());

      const response = await fetchClientAPI(id);

      dispatch(uiStopLoading());

      if (response.status) {
        dispatch(clientsSuccess(response.data));
      } else {
        dispatch(clientsFailed(response.message));
        dispatch(uiStartAlert(response.message, 'danger'));
      }
    } catch (err) {
      dispatch(clientsFailed(err));
      dispatch(uiStartAlert(err, 'danger'));
    }
  };
};

export const saveClient = (data) => {
  return async dispatch => {
    try {
      dispatch(uiStartLoading());

      const response = await saveClientAPI(data);

      dispatch(uiStopLoading());

      if (response.status) {
        dispatch(clientsSuccess(response.data));
        dispatch(uiStartAlert(response.message, 'success'));
      } else {
        dispatch(clientsFailed(response.message));
        dispatch(uiStartAlert(response.message, 'danger'));
      }
    } catch (err) {
      dispatch(clientsFailed(err));
      dispatch(uiStartAlert(err, 'danger'));
    }
  };
};
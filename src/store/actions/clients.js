import { 
  FETCH_CLIENTS_BEGIN,
  FETCH_CLIENTS_SUCCESS, 
  FETCH_CLIENTS_FAILED,
  FETCH_CLIENT_BEGIN,
  FETCH_CLIENT_SUCCESS,
  FETCH_CLIENT_FAILED,
  SAVE_CLIENT_BEGIN,
  SAVE_CLIENT_SUCCESS,
  SAVE_CLIENT_FAILED
} from '../actionTypes';
import { uiStartLoading, uiStopLoading } from './loader';
import { addAlert } from './alert';

import { fetchClientsAPI, fetchClientAPI, saveClientAPI } from '../../services/api';

const fetchClientsBegin = () => {
  return {
    type: FETCH_CLIENTS_BEGIN
  };
};

const fetchClientsSuccess = data => {
  return {
    type: FETCH_CLIENTS_SUCCESS,
    payload: data
  };
};

const fetchClientsFailed = error => {
  return {
    type: FETCH_CLIENTS_FAILED,
    error: error
  };
};

// fetch clients data via rest api
export const fetchClients = () => {
  return async dispatch => {
    try {
      dispatch(fetchClientsBegin());
      dispatch(uiStartLoading());

      const response = await fetchClientsAPI();
      
      dispatch(uiStopLoading());

      if (response.status) {
        dispatch(fetchClientsSuccess(response.data));
      } else {
        dispatch(fetchClientsFailed(response.message));
        dispatch(addAlert(response.message, 'error'));
      }
    } catch (err) {
      dispatch(fetchClientsFailed(err));
      dispatch(addAlert(err.message, 'error'));
      dispatch(uiStopLoading());
    }
  };
};

const fetchClientBegin = () => {
  return {
    type: FETCH_CLIENT_BEGIN
  };
};

const fetchClientSuccess = data => {
  return {
    type: FETCH_CLIENT_SUCCESS,
    payload: data
  };
};

const fetchClientFailed = error => {
  return {
    type: FETCH_CLIENT_FAILED,
    error: error
  };
};

// fetch client data via rest api by passing id
export const fetchClient = (id) => {
  return async dispatch => {
    try {
      dispatch(fetchClientBegin());
      dispatch(uiStartLoading());

      const response = await fetchClientAPI(id);

      dispatch(uiStopLoading());

      if (response.status) {
        dispatch(fetchClientSuccess(response.data));
      } else {
        dispatch(fetchClientFailed(response.message));
        dispatch(addAlert(response.message, 'error'));
      }
    } catch (err) {
      dispatch(fetchClientFailed(err));
      dispatch(addAlert(err.message, 'error'));
      dispatch(uiStopLoading());
    }
  };
};

const saveClientBegin = () => {
  return {
    type: SAVE_CLIENT_BEGIN
  };
};

const saveClientSuccess = data => {
  return {
    type: SAVE_CLIENT_SUCCESS,
    payload: data
  };
};

const saveClientFailed = error => {
  return {
    type: SAVE_CLIENT_FAILED,
    error: error
  };
};

export const saveClient = (data) => {
  return async dispatch => {
    try {
      dispatch(saveClientBegin());
      dispatch(uiStartLoading());

      const response = await saveClientAPI(data);

      dispatch(uiStopLoading());

      if (response.status) {
        dispatch(saveClientSuccess(response.data));
        dispatch(addAlert(response.message, 'success'));
      } else {
        dispatch(saveClientFailed(response.message));
        dispatch(addAlert(response.message, 'error'));
      }
    } catch (err) {
      dispatch(saveClientFailed(err));
      dispatch(addAlert(err.message, 'error'));
      dispatch(uiStopLoading());
    }
  };
};
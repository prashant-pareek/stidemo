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

export const fetchClients = () => {
  return async dispatch => {
    dispatch(fetchClientsSuccess([
      {id:"1",companyName:"Metacube", abbreviation:"mt"},
      {id:"2",companyName:"Metacube", abbreviation:"mt"},
      {id:"3",companyName:"Metacube", abbreviation:"mt"},
      {id:"4",companyName:"Metacube", abbreviation:"mt"},
      {id:"5",companyName:"Metacube", abbreviation:"mt"},
      {id:"6",companyName:"Metacube", abbreviation:"mt"},
      {id:"7",companyName:"Metacube", abbreviation:"mt"},
      {id:"8",companyName:"Metacube", abbreviation:"mt"},
      {id:"9",companyName:"Metacube", abbreviation:"mt"},
      {id:"10",companyName:"Dotsquares", abbreviation:"ds"},
      {id:"11",companyName:"NagarroSoftwares", abbreviation:"ngro"},
      {id:"12",companyName:"AllOnBlock", abbreviation:"aob"},
      {id:"13",companyName:"Test", abbreviation:"ts"},
      {id:"14",companyName:"NagarroSoftwares", abbreviation:"ngro"},
      {id:"15",companyName:"NagarroSoftwares", abbreviation:"ngro"},
      {id:"16",companyName:"NagarroSoftwares", abbreviation:"ngro"},
      {id:"17",companyName:"NagarroSoftwares", abbreviation:"ngro"},
      {id:"18",companyName:"NagarroSoftwares", abbreviation:"ngro"},
      {id:"19",companyName:"AllOnBlock", abbreviation:"aob"},
      {id:"20",companyName:"AllOnBlock", abbreviation:"aob"},
    ]));
    // try {
    //   dispatch(fetchClientsBegin());
    //   dispatch(uiStartLoading());

    //   const response = await fetchClientsAPI();

    //   dispatch(uiStopLoading());

    //   if (response.status) {
    //     dispatch(fetchClientsSuccess(response.data));
    //   } else {
    //     dispatch(fetchClientsFailed(response.message));
    //     dispatch(addAlert({message: response.message, type: 'error'}));
    //   }
    // } catch (err) {
    //   dispatch(fetchClientsFailed(err));
    //   dispatch(addAlert({message: err.message, type: 'error'}));
    //   dispatch(uiStopLoading());
    // }
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
        dispatch(addAlert({message: response.message, type: 'error'}));
      }
    } catch (err) {
      dispatch(fetchClientFailed(err));
      dispatch(addAlert({message: err.message, type: 'error'}));
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
        dispatch(addAlert({message: response.message, type: 'success'}));
      } else {
        dispatch(saveClientFailed(response.message));
        dispatch(addAlert({message: response.message, type: 'error'}));
      }
    } catch (err) {
      dispatch(saveClientFailed(err));
      dispatch(addAlert({message: err.message, type: 'error'}));
      dispatch(uiStopLoading());
    }
  };
};
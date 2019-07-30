import axios from 'axios';
import store from '../store';

const baseURL = process.env.REACT_APP_API_URL;

export const callAPI = async (url = '', method = 'get', data = null, auth = true) => {
  try {
    const headers = {};

    if (auth) {
      const state = store.getState();

      let token = (state.auth.token) ? state.auth.token : '';
      headers.Authorization = 'Bearer ' + token;
    }

    const config = {
      headers: headers
    };

    return await axios[method](baseURL + url, data, config);
  } catch (err) {
    throw err;
  }
};

export const loginAPI = data => callAPI('auth', 'post', data, null, false);
export const fetchClientsAPI = () => callAPI('companys');
export const fetchClientAPI = id => callAPI('company/'+id);
export const saveClientAPI = data => callAPI('company/add', 'post', data);
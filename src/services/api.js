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
    
    return await axios({
      url: config.BASEURL + url,
      method: method,
      data: data,
      timeout: 1000,
      headers
    });

  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      error.message = `Request Timeout`;
    }
    throw error;
  }
};

export const loginAPI = data => callAPI('auth', 'post', data, null, false);
export const fetchClientsAPI = () => callAPI('companys');
export const fetchClientAPI = id => callAPI('company/'+id);
export const saveClientAPI = data => callAPI('company/add', 'post', data);
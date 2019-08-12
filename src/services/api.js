import axios from 'axios';
import store from '../store';

const baseURL = process.env.REACT_APP_BASE_URL;

/**
 * 
 * @param {string} url endpoint url to attach with base url
 * @param {string} method method to call rest api: get, post, put
 * @param {object} data object to be send with rest api as post data
 * @param {boolean} auth if true jwt token will be attached to authentication header
 */
export const callAPI = async (url = '', method = 'get', data = null, auth = true) => {
  try {
    const headers = {};

    if (auth) {
      const state = store.getState();

      let token = (state.auth.token) ? state.auth.token : '';
      headers.Authorization = 'Bearer ' + token;
    }

    return await axios({
      url: baseURL + url,
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

// define rest api function with parameters
export const loginAPI = data => callAPI('auth', 'post', data, null, false);
export const fetchClientsAPI = () => callAPI('companys');
export const fetchClientAPI = id => callAPI('company/'+id);
export const saveClientAPI = data => callAPI('company/add', 'post', data);
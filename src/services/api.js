import axios from 'axios';
import * as config from '../config';

export const callAPI = async (url, method, data = null) => {
  try {
    return await axios[method](config.BASEURL + url, data);
  } catch (err) {
    throw err;
  }
}

export const loginAPI = data => callAPI('auth', 'post', data);
export const fetchClientsAPI = () => callAPI('companys', 'get');
export const fetchClientAPI = id => callAPI('company/'+id, 'get');
export const saveClientAPI = data => callAPI('company/add', 'post', data);
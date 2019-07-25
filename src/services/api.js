import axios from 'axios';
import * as config from '../config';

export const callAPI = async (url, method, data = null) => {
  try {
    return await axios({
      url: config.BASEURL + url,
      method: method,
      data: data,
      timeout: 1000
    });
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      error.message = `Request Timeout`;
    }
    throw error;
  }
}

export const fetchClientsAPI = () => callAPI('companys', 'get');
export const fetchClientAPI = id => callAPI('company/'+id, 'get');
export const saveClientAPI = data => callAPI('company/add', 'post', data);
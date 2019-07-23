import { ADD_ALERT, REMOVE_ALERT } from '../actionTypes';
import shortid from 'shortid'

export const addAlert = alert => {
  return {
    type: ADD_ALERT,
    alert: {
      ...alert,
      key: shortid.generate()
    }
  };
};

export const removeAlert = key => ({
  type: REMOVE_ALERT,
  key,
});


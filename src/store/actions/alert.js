import { ADD_ALERT, REMOVE_ALERT } from '../actionTypes';
import shortid from 'shortid';

// append alert message object
export const addAlert = (message, type) => {
  return {
    type: ADD_ALERT,
    alert: {
      message,
      type,
      key: shortid.generate()
    }
  };
};

export const removeAlert = key => ({
  type: REMOVE_ALERT,
  key
});


import { UI_SHOW_ALERT, UI_HIDE_ALERT } from '../actionTypes';

export const uiStartAlert = (msg, type) => {
  return dispatch => {
    dispatch(uiShowAlert(msg, type));
    dispatch(alertTimeout());
  };
};
export const uiEndAlert = () => {
  return dispatch => {
    dispatch(uiHideAlert());
  };
};

const uiShowAlert = (msg, type) => {
  return {
    type: UI_SHOW_ALERT,
    msg: msg.toString(),
    msgType: type
  };
};

const uiHideAlert = () => {
  return {
    type: UI_HIDE_ALERT,
  };
};

const alertTimeout = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(uiHideAlert());
    }, 6000);
  };
};
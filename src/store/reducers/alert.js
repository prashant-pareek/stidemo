import { UI_SHOW_ALERT, UI_HIDE_ALERT } from '../actionTypes';

const initialState = {
  show: false,
  type: '',
  msg: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_SHOW_ALERT:
      return {
        ...state,
        show: true,
        msg: action.msg,
        type: action.msgType || ''
      };
    case UI_HIDE_ALERT:
      return {
        ...state,
        show: false,
        msg: '',
        type: ''
      };
    default:
      return state;
  }
};

export default reducer;

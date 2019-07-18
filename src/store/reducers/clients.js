import { CLIENT_SUCCESS, CLIENT_FAILED } from '../actionTypes';

const initialState = {
  success: false,
  data: null,
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLIENT_SUCCESS:
      return {
        ...state,
        success: true,
        data: action.payload,
        error: null
      };
    case CLIENT_FAILED:
      return {
        ...state,
        success: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;

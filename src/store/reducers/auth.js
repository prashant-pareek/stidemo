import {
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from '../actionTypes';

const initialState = {
  token: null,
  user: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        token: action.token,
        user: action.user
      };
    case LOGIN_FAILED:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
import { ADD_ALERT, REMOVE_ALERT } from '../actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
      case ADD_ALERT:
          return [
            ...state,
            {
              key: action.key,
              ...action.alert,
            }
          ];
      case REMOVE_ALERT:
          return state.filter( alert => alert.key !== action.key);
      default:
          return state;
  }
};

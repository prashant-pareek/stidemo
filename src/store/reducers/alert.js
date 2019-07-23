import { ADD_ALERT, CLOSE_ALERT, REMOVE_ALERT } from '../actionTypes';

const defaultState = [];

export default (state = defaultState, action) => {
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

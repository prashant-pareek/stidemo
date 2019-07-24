import { ADD_ALERT, REMOVE_ALERT } from '../actionTypes';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return [
        ...state, 
        action.alert
      ];
    case REMOVE_ALERT:
      return state.filter( alert => alert.key !== action.key);
    default:
      return state;
  }
};
export default reducer;
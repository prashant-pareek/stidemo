import { 
  FETCH_CLIENTS_BEGIN,
  FETCH_CLIENTS_SUCCESS, 
  FETCH_CLIENTS_FAILED,
  FETCH_CLIENT_BEGIN,
  FETCH_CLIENT_SUCCESS,
  FETCH_CLIENT_FAILED,
  SAVE_CLIENT_BEGIN,
  SAVE_CLIENT_SUCCESS,
  SAVE_CLIENT_FAILED
} from '../actionTypes';

const initialState = {
  clientsSuccess: false,
  clients: null,
  clientsError: null,
  clientSuccess: false,
  client: null,
  clientError: null,
  saveSuccess: false,
  saveData: null,
  saveError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTS_BEGIN:
      return {
        ...state,
        clientsSuccess: false,
        clients: null,
        clientsError: null
      };
    case FETCH_CLIENTS_SUCCESS:
      return {
        ...state,
        clientsSuccess: true,
        clients: action.payload,
        clientsError: null
      };
    case FETCH_CLIENTS_FAILED:
      return {
        ...state,
        clientsSuccess: false,
        clients: null,
        clientsError: action.error
      };
    case FETCH_CLIENT_BEGIN:
      return {
        ...state,
        clientSuccess: false,
        client: null,
        clientError: null
      };
    case FETCH_CLIENT_SUCCESS:
      return {
        ...state,
        clientSuccess: true,
        client: action.payload,
        clientError: null
      };
    case FETCH_CLIENT_FAILED:
      return {
        ...state,
        clientSuccess: false,
        client: null,
        clientError: action.error
      };
    case SAVE_CLIENT_BEGIN:
      return {
        ...state,
        saveSuccess: false,
        saveData: null,
        saveError: null
      };
    case SAVE_CLIENT_SUCCESS:
      return {
        ...state,
        saveSuccess: true,
        saveData: action.payload,
        saveError: null
      };
    case SAVE_CLIENT_FAILED:
      return {
        ...state,
        saveSuccess: false,
        saveData: null,
        saveError: action.error
      };
    default:
      return state;
  }
};

export default reducer;

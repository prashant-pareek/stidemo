import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import loaderReducer from './reducers/loader';
import alertReducer from './reducers/alert';
import clientsReducer from './reducers/clients';

const rootReducer = combineReducers({
  loader: loaderReducer,
  alert: alertReducer,
  clients: clientsReducer
});

let composeEnhancers = compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
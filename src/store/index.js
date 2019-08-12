import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import loaderReducer from './reducers/loader';
import alertReducer from './reducers/alert';
import authReducer from './reducers/auth';
import clientsReducer from './reducers/clients';

// create reducer object
const rootReducer = combineReducers({
  loader: loaderReducer,
  alerts: alertReducer,
  auth: authReducer,
  clients: clientsReducer
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

// configure store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
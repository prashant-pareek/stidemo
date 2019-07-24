import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { Slide } from '@material-ui/core';
function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

const app = (
  <Provider store={store}>
    <BrowserRouter>
    <SnackbarProvider 
      maxSnack={10}
      TransitionComponent={TransitionUp}
    >
      <App />
    </SnackbarProvider>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();

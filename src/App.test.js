import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Slide } from '@material-ui/core';

import App from './App';
import store from './store';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
      <SnackbarProvider 
        maxSnack={10}
        TransitionComponent={TransitionUp}
        className="customAlert">
        <App />
      </SnackbarProvider>
      </BrowserRouter>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});
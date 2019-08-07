import React from 'react';
import { connect } from 'react-redux';
import { autoLogIn } from './store/actions';

import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import Alert from './components/UI/Alert';

class App extends React.Component {
  componentDidMount() {
    this.props.onAutoLogIn();
  }

  render() {
    return (
      <>
        {(this.props.isAuthenticated) ? <Dashboard /> : <Auth />}
        <Alert />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogIn: () => dispatch(autoLogIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

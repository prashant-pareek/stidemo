import React from 'react';
import { connect } from 'react-redux';
import { autoLogIn } from './store/actions/auth';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Alert from './components/UI/Alert';

class App extends React.Component {
  componentDidMount() {
    this.props.onAutoLogIn();
  }

  render() {
    let component = <Login />;

    if (this.props.isAuthenticated) {
      component = <Dashboard />;
    }

    return (
      <>
        {component}
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

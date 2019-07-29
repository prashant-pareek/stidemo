import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { autoLogIn } from './store/actions/auth';

import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Alert from './components/UI/Alert';

class App extends React.Component {
  componentDidMount() {
    this.props.onAutoLogIn();
  }

  render() {
    let component = <Auth />;
    let routes = null;

    if (this.props.isAuthenticated) {
      component = <Dashboard />;
    } else {
      routes = (
        <Switch>
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <>
        {component}
        <Alert />
        {routes}
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

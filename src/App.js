import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );;
    
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to="/dashboard" />
        </Switch>
      );
    }

    return (
      <>
        {routes}
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

import React from 'react';
import { connect } from 'react-redux';
import { saveAuth, autoLogIn } from './store/actions/auth';

import Dashboard from './components/Dashboard/Dashboard';
import Auth from './components/Auth/Auth';
import Alert from './components/UI/Alert';

class App extends React.Component {
  componentDidMount() {
    this.props.onAutoLogIn();

    /*if (!this.props.isAuthenticated) {
      const keycloak = Keycloak({
        "realm": "demo",
        "url": "http://172.16.6.250:8080/auth",
        "ssl-required": "external",
        "clientId": "login-app",
        "public-client": true,
        "verify-token-audience": true,
        "use-resource-role-mappings": true,
        "confidential-port": 0
      });

      keycloak.init({onLoad: 'login-required'}).success(authenticated => {
        this.props.saveAuth(keycloak);
      });
    }*/
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
    saveAuth: kc => dispatch(saveAuth(kc)),
    onAutoLogIn: () => dispatch(autoLogIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

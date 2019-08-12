import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveAuth } from '../../store/actions';

// load keycloak configured object
import keycloak from '../../services/keycloak';

class AuthInit extends React.Component {
  componentDidMount() {
    // initialize keycloak authentication
    keycloak.init({onLoad: 'login-required'}).success(authenticated => {
      if (authenticated) {
        // save token and user to localstorage and global state
        this.props.saveAuth(keycloak);

        // redirect to dashboard page
        this.props.history.push('/dashboard');
      }
    })
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveAuth: kc => dispatch(saveAuth(kc))
  };
};

export default connect(null, mapDispatchToProps)(withRouter(AuthInit));
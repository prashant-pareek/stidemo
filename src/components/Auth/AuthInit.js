import React from 'react';
import Keycloak from 'keycloak-js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveAuth } from '../../store/actions/auth';

class AuthInit extends React.Component {
  componentDidMount() {
    const keycloak = Keycloak({
      "realm": process.env.REACT_APP_KC_REALM,
      "url": process.env.REACT_APP_KC_URL,
      "ssl-required": process.env.REACT_APP_KC_SSL_REQUIRED,
      "clientId": process.env.REACT_APP_KC_CLIENT_ID,
      "public-client": process.env.REACT_APP_KC_PUBLIC_CLIENT,
      "verify-token-audience": process.env.REACT_APP_KC_VERIFY_TOKEN_AUDIENCE,
      "credentials": {
        "secret": process.env.REACT_APP_KC_SECRET
      },
      "use-resource-role-mappings": process.env.REACT_APP_KC_USE_RESOURCE_ROLE_MAPPINGS,
      "confidential-port": process.env.REACT_APP_KC_CONFIDENTIAL_PORT
    });

    keycloak.init({onLoad: 'login-required'}).success(authenticated => {
      if (authenticated) {
        this.props.saveAuth(keycloak);
        this.props.history.push('/');
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
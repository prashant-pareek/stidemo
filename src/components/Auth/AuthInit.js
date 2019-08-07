import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import keycloak from '../../services/keycloak';
import { saveAuth } from '../../store/actions';

class AuthInit extends React.Component {
  componentDidMount() {
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
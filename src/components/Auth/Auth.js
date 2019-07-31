import React from 'react';
import {
  withStyles,
  createMuiTheme,
  Avatar,
  Container,
  CssBaseline,
  Button
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { connect } from 'react-redux';
import Keycloak from 'keycloak-js';
import { saveAuth } from '../../store/actions/auth';

const theme = createMuiTheme();

const styles = {
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  authBtn: {
    marginTop: theme.spacing(2)
  }
};

class Auth extends React.Component {
  state = {
    auth: false
  }

  componentDidUpdate() {
    console.log('asdf', this.state.auth);
    if (this.state.auth) {
      const keycloak = Keycloak({
        "realm": process.env.REACT_APP_KC_REALM,
        "url": process.env.REACT_APP_KC_URL,
        "ssl-required": process.env.REACT_APP_KC_SSL_REQUIRED,
        "clientId": process.env.REACT_APP_KC_CLIENT_ID,
        "public-client": process.env.REACT_APP_KC_PUBLIC_CLIENT,
        "verify-token-audience": process.env.REACT_APP_KC_VERIFY_TOKEN_AUDIENCE,
        "credentials": {
          "secret": "9dd38546-65fe-4f8d-a49a-fd2c68f72789"
        },
        "use-resource-role-mappings": process.env.REACT_APP_KC_USE_RESOURCE_ROLE_MAPPINGS,
        "confidential-port": process.env.REACT_APP_KC_CONFIDENTIAL_PORT
      });
  
      keycloak.init({onLoad: 'login-required'}).success(() => {
        this.props.saveAuth(keycloak);
        this.setState({auth: false});
        console.log('yes');
      });
    }
  }

  authClickHandler = () => {
    this.setState({auth: true});
    console.log('tes');
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Button
            type="button"
            fullWidth
            size="large"
            variant="outlined"
            color="primary"
            className={classes.authBtn}
            onClick={this.authClickHandler}
          >
            Authenticate
          </Button>
        </div>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveAuth: kc => dispatch(saveAuth(kc))
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Auth));
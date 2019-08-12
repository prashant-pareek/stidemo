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
import { withRouter } from 'react-router-dom';
import AuthInit from './AuthInit';

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
  authHandler = () => {
    // on auth button click, append auth 
    // query parameter to current url
    this.props.history.push('/?auth=1');
  }

  render() {
    const { classes } = this.props;

    let authInit = null;
    
    // if auth parameter found in current url
    // load authinit component to initialize keycloak authentication
    if (this.props.location.search === '?auth=1') {
      authInit = <AuthInit />
    }

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
            onClick={this.authHandler}
          >
            Authenticate
          </Button>
          {authInit}
        </div>
      </Container>
    )
  }
}

export default withStyles(styles)(withRouter(Auth));
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
import { keyCloakLogin } from '../../store/actions/auth';

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

  authClickHandler = () => {
    this.props.onLogin();
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
    onLogin: data => dispatch(keyCloakLogin(data))
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Auth));
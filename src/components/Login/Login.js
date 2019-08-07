import React from 'react';
import {
  withStyles,
  createMuiTheme,
  Avatar,
  Button,
  CssBaseline,
  Link,
  Grid,
  Typography,
  Container
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux';
import { login } from '../../store/actions';
import Input from '../UI/Input';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
};

class Login extends React.Component {
  state = {
    controls: {
      username: {
        required: true,
        fullWidth: true,
        autoComplete: 'email',
        autoFocus: true,
        label: 'Username',
        value: '',
        placeholder: 'Enter username',
        validationRules: 'required|alpha|min:2|max:100'
      },
      password: {
        required: true,
        fullWidth: true,
        autoComplete: 'current-password',
        label: 'Password',
        value: '',
        placeholder: 'Enter password',
        type: 'password',
        validationRules: 'required|alpha|min:2|max:20'
      }
    }
  };

  validator = new SimpleReactValidator();

  updateInput = (event, key) => {
    const value = event.target.value;
    
    this.setState(state => {
      return {
        controls: {
          ...state.controls,
          [key]: {
            ...state.controls[key],
            value: value
          }
        }
      }
    });
  }

  submitFormHandler = async () => {
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    
    if (this.validator.allValid()) {
      this.setState({isError: false});

      await this.props.onSaveClient(data);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const { classes } = this.props;
    let fields = null;

    fields = Object.keys(this.state.controls).map(key => {
      let { validationRules, ...field } = this.state.controls[key];

      return (<Input
        {...field}
        key={key}
        changeHandler={(event) => this.updateInput(event, key)}
        fieldName={field.label}
        validator={this.validator}
        validationRules={validationRules || false }
      />)
    });

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            {fields}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: data => dispatch(login(data))
  };
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));
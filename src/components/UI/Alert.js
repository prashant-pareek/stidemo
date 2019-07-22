import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { IconButton, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { green, red, amber, blue } from '@material-ui/core/colors';
import { uiEndAlert } from '../../store/actions/alert';

const styles = {
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[400],
  },
  info: {
    backgroundColor: blue[600]
  },
  warning: {
    backgroundColor: amber[700]
  },
  danger: {
    backgroundColor: red[600]
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  }
};

class Alert extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      vertical: 'top',
      horizontal: 'right',
    };
  }
  componentWillReceiveProps = (nextProps) => {
    this.setState({open: nextProps.show });
  }

  handleClose = () => {
    this.setState({open: false });
    this.props.uiEndAlert();
  }
  render () {
    const { classes, className, type, msg } = this.props;
    const { vertical, horizontal, open } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: vertical,
          horizontal: horizontal,
        }}
        open={open}
        onClose={this.handleClose}
        TransitionComponent={Slide}
      >
        <SnackbarContent
          className={clsx(classes[type], className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              {msg}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />

      </Snackbar>
    )
  }
}


const mapStateToProps = state => {
  return {
    show: state.alert.show,
    type: state.alert.type,
    msg: state.alert.msg
  };
}


export default connect(mapStateToProps, {uiEndAlert})(withStyles(styles)(Alert));
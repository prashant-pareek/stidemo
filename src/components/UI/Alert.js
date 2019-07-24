import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeAlert } from '../../store/actions/alert';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton, Slide } from '@material-ui/core';

class Alert extends Component {
  displayed = [];
  
  shouldComponentUpdate({ alerts: newAlerts = [] }) {
    if (!newAlerts.length) {
      this.displayed = [];
      return false;
    }
    return true;
  }
  
  componentDidUpdate() {
    const { alerts = [] } = this.props;

    alerts.forEach(({ key, message, type }) => {
      // Do nothing if alert is already displayed
      if (this.displayed.includes(key)) return;

      // Display alert using notistack
      this.displayed.push(key);

      this.props.enqueueSnackbar(message, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        autoHideDuration: 6000,
        key: key,
        variant: type || 'default',
        action: key => (
          <IconButton 
            key="close" 
            aria-label="Close" 
            color="inherit" 
            style={{
              padding: 0
            }}
            onClick={() => {
              this.props.closeSnackbar(key); 
              this.props.removeAlert(key)
            }}
          >
            <CloseIcon  />
          </IconButton>
        ),
        onClose: (event, reason, key) => {
          const dIndex = this.displayed.indexOf(key);

          if (dIndex > -1) {
            this.displayed.splice(dIndex, 1);
          }

          // Dispatch action to remove alert from redux store
          this.props.removeAlert(key);
        }
      });
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  alerts: state.alerts,
});

const mapDispatchToProps = dispatch => {
  return {
    removeAlert: key => dispatch(removeAlert(key))
  };
};

export default withSnackbar(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Alert));


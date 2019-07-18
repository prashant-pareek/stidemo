import React from 'react';
import { 
  withStyles
} from '@material-ui/core';
import { connect } from 'react-redux';

const styles = {
  alertSuccess: {
    backgroundColor: 'green'
  },
  alertDanger: {
    backgroundColor: 'red'
  }
};

const Alert = (props) => {
  const { classes, show, type, msg } = props;

  if (!show) {
    return null;
  }

  let cls = null;

  if (type == 'success') {
    cls = classes.alertSuccess;
  }

  if (type == 'danger') {
    cls = classes.alertDanger
  }

  return (
    <div className={cls}>{msg}</div>
  )
};

const mapStateToProps = state => {
  return {
    show: state.alert.show,
    type: state.alert.type,
    msg: state.alert.msg
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Alert));
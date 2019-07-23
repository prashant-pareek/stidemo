import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b9b7b473',
    zIndex: 9999
  },
}));

const Loader = (props) => {
  const classes = useStyles();
  if (props.loader && props.loader.isLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    )
  } else {
    return null
  }
};

const mapStateToProps = state => ({
  loader: state.loader,
});


export default connect(
  mapStateToProps,
)(Loader);

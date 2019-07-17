import React from 'react';
import { 
  withStyles,
  createMuiTheme,
  TextField 
} from '@material-ui/core';

const theme = createMuiTheme();

const styles = {
  field: {
    width: '40%',
    marginRight: theme.spacing(2)
  }
};

const Input = (props) => {
  const { classes } = props;

  return (
    <TextField
      id={props.id}
      name={props.name}
      className={classes.field}
      label={props.label}
      placeholder={props.placeholder || ''}
      value={props.value}
      onChange={props.changeHandler}
      helperText={props.helperText || ''}
      margin="normal"
      variant="outlined"
    />
  )
};

export default withStyles(styles)(Input);
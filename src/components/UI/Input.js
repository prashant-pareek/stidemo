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
  const error = (props.validator && props.validationRules && props.fieldName) ? props.validator.message(props.fieldName, props.value, props.validationRules) : null
  return (
    <TextField
      className={classes.field}
      label={props.label}
      placeholder={props.placeholder || ''}
      value={props.value}
      onChange={props.changeHandler}
      error={(error) ? true : false}
      helperText={error || props.helperText || ''}
      margin="normal"
      variant="outlined"
    />
  )
};

export default withStyles(styles)(Input);
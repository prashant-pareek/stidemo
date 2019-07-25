import React from 'react';
import { TextField } from '@material-ui/core';

export default (props) => {
  const { 
    clsName, 
    validator, 
    validationRules, 
    fieldName, 
    changeHandler, 
    helperText, 
    ...fields
  } = props;
  let error = null;

  if (validator && validationRules && fieldName) {
    error = validator.message(fieldName, fields.value, validationRules);
  }

  return (
    <TextField
      {...fields}
      className={clsName}
      onChange={changeHandler}
      error={(error) ? true : false}
      helperText={error || helperText || ''}
      margin="normal"
      variant="outlined"
    />
  )
};
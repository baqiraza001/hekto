import { FormHelperText, TextField } from '@mui/material'
import React from 'react'

function TextInput(props) {
  const { input, meta, ...rest } = props;
  const { touched, error } = meta;
    return (
    <>
      <TextField fullWidth {...input} {...rest} error={touched && error ? true : false} />
      <FormHelperText error>
        {
          touched && error ? error : <span>&nbsp;</span>
        }
      </FormHelperText>
    </>
  )
}

export default TextInput
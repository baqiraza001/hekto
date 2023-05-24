import React from 'react'
import { FormHelperText, TextField } from '@mui/material'


function TextAreaInput(props) {
    const { input, meta, ...rest } = props;
    const { touched, error } = meta;
  return (
    <>
        <TextField
        fullWidth
        {...input}
        {...rest}
        error={touched && error ? true : false}
        multiline
        rows={4}

        />
        <FormHelperText error>
            {
                touched && error ? error : <span>&nbsp;</span>
            }
        </FormHelperText>
    </>
  )
}

export default TextAreaInput
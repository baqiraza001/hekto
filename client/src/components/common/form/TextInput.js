import { FormHelperText, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function TextInput(props) {
    const { input, meta, ...rest } = props;
    const { touched, error } = meta;
  return (
    <Box mb={3}>
        <TextField fullWidth {...input} {...rest} error={touched && error ? true : false} />
        <FormHelperText error>
            {
                touched && error ? error : <span>&nbsp;</span>
            }
        </FormHelperText>
    </Box>
  )
}

export default TextInput
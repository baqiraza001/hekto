import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

function SelectInput(props) {
    const { input, meta, options, label, ...rest } = props;
    const { touched, error } = meta;
    console.log(props)


    return (
        <FormControl fullWidth>

            <InputLabel id="demo-simple-select-label">{input.name}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                {...input}
                {...rest}
                error={touched && error ? true : false}
                label={input.name}
            >
                {
                    options.map((option, index) => {
                        return (
                            <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default SelectInput
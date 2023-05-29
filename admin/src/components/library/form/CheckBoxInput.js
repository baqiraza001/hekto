import { FormHelperText, FormGroup, FormControlLabel, Checkbox } from '@mui/material'

export default function CheckBoxInput(props) {
    const { input, meta, checked, ...rest } = props;
    const { touched, error } = meta;

    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Checkbox {...input} checked={checked} />} {...rest}  />
            </FormGroup>
            <FormHelperText error>
                {
                    touched && error ? error : <span>&nbsp;</span>
                }
            </FormHelperText>
        </>
    )
}

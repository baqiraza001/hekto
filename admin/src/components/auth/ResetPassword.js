import { Form, Field } from "react-final-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { showError, showSuccess } from "../../store/actions/alertActions";



const ResetPassword = () => {
  const dispatch = useDispatch()
  const { resetCode } = useParams();
  const navigate = useNavigate();


console.log(resetCode)

  useEffect( () => {
    axios.post('/users/verify-reset-code', { code: resetCode }).then( result => {

    }).catch(error => {
      console.log(error);
      dispatch(showError(error.message));
      navigate('/admin/signin')
    })
  }, [])


  const handleSubmit = (data, form) => {
    return (
      axios.post('/users/reset-password', { ...data, code: resetCode }).then( ({data}) => {
        if(data.success)
          dispatch(showSuccess("Password changed Successfully"))
          navigate('/admin/signin')
      }).catch( err => {
      let message = err && err.response && err.response.data ? err.response.data.error : err.message
      dispatch(showError(message))
    })
    )
  };

  const handleValidation = (data, form) => {
    const errors = {};

    if (!data.newPassword)
      errors.newPassword = "Password is required";
    else if (data.newPassword.length < 6)
      errors.newPassword = "Password should have at least 6 characters";

    if (!data.confirmPassword)
      errors.confirmPassword = "Please confirm password";

    if (data.confirmPassword && data.newPassword !== data.confirmPassword)
      errors.confirmPassword = "Passwords are not same";
    return errors
  }


  return (
    <div>
      <Box textAlign="center" maxWidth="500px" margin="auto">
        <Form
          onSubmit={handleSubmit}
          validate={handleValidation}
          initialValues={{}}
          render={({
            handleSubmit,
            submitting,
            submitError,
            submitSucceeded,
            invalid,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box boxShadow='0px 0px 25px 10px #F8F8FB' p={5} >
                <Box>
                  <Typography color={"#000000"} fontFamily={"var(--josefin)"} fontSize={"32px"} fontWeight={700} >Reset Password</Typography>
                </Box>
                <Box>
                  <Typography fontSize={"17px"} fontFamily={"var(--lato)"} fontWeight={"400"} color={"#9096B2"} >Enter new password and confirm new password</Typography>
                </Box>
                <Box my={3}>
                  <Field name="newPassword">
                    {({ input, meta }) => (
                      <TextField
                        InputLabelProps={{ sx: { "color": "#9096B2", "fontFamily": "var(--lato)", "fontWeight": "400", "fontSize": "16px" } }}
                        {...input}
                        label="New Password"
                        fullWidth
                        type="password"
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>
                <Box mb={2}>
                  <Field name="confirmPassword">
                    {({ input, meta }) => (
                      <TextField
                        InputLabelProps={{ sx: { "color": "#9096B2", "fontFamily": "var(--lato)", "fontWeight": "400", "fontSize": "16px" } }}
                        {...input}
                        type="password"
                        label="Confirm Password"
                        fullWidth
                        mb={2}
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    style={{ "backgroundColor": "#FB2E86", "fontFamily": "16px", "fontFamily": "16px", "fontWeight": '700', 'fontFamily': "var(--lato)" }}
                    type="submit"
                    fullWidth
                  >
                    Reset Password
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        />
      </Box>
    </div>
  )
}

export default ResetPassword
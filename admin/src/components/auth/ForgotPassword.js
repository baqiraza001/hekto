import { Form, Field } from "react-final-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../store/actions/alertActions";



function ForgotPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (data, form) => {
    axios.post("/users/forgot-password", data).then(({ data }) => {
      if(data.success)
        dispatch(showSuccess("We have sent an Email"))
        navigate("/admin/signin")
    }).catch(err => {
      let message = err && err.response && err.response.data ? err.response.data.error : err.message
      dispatch(showError(message))
    })
    const fields = form.getRegisteredFields(); // Get all the registered field names
    fields.forEach((field) => {
      form.resetFieldState(field); // Reset the touched state for each field
      form.change(field, null); // Reset the value of each field to null
    });
  };

  const handleValidation = (data) => {
    const errors = {}

    if (!data.email)
      errors.email = "Email is required"
    else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))
      errors.email = "Invalid Email"
    return errors
  }
  return (
    <div>
      <Box textAlign="center" maxWidth="500px" margin="auto">
        <Form
          onSubmit={handleSubmit}
          initialValues={{}}
          validate={handleValidation}
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
                  <Typography color={"#000000"} fontFamily={"var(--josefin)"} fontSize={"32px"} fontWeight={700} >Forgot Password</Typography>
                </Box>
                <Box>
                  <Typography fontSize={"17px"} fontFamily={"var(--lato)"} fontWeight={"400"} color={"#9096B2"} >Please enter your email to reset the password.</Typography>
                </Box>
                <Box my={3}>
                  <Field name="email">
                    {({ input, meta }) => (
                      <TextField
                        InputLabelProps={{ sx: { "color": "#9096B2", "fontFamily": "var(--lato)", "fontWeight": "400", "fontSize": "16px" } }}
                        {...input}
                        label="Email Address"
                        fullWidth
                        type="email"
                        error={!!(meta.touched && meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Box>

                <Box display={"flex"} mb={2} justifyContent={"flex-start"} >
                  <Typography color="#9096B2" fontFamily={"var(--lato)"} fontSize={"17px"} fontWeight={400} > <NavLink to={"/admin/"}>Sign in</NavLink> </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    style={{ "backgroundColor": "#FB2E86", "fontFamily": "16px", "fontFamily": "16px", "fontWeight": '700', 'fontFamily': "var(--lato)" }}
                    type="submit"
                    fullWidth
                  >
                    recover password
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

export default ForgotPassword
import { Form, Field } from "react-final-form";
import { TextField, Button,Box, Typography} from "@mui/material";
const Login = () => {

  const handleSubmit = (data, form) => {
    const fields = form.getRegisteredFields(); // Get all the registered field names
    fields.forEach((field) => {
      form.resetFieldState(field); // Reset the touched state for each field
      form.change(field, null); // Reset the value of each field to null
    });
    // form.reset();
  };


  return (
    <div>
      <Box textAlign="center" maxWidth="500px" mx="auto">
        <Form
        onSubmit={handleSubmit}
        initialValues={{}}
        render={({
          handleSubmit,
          submitting,
          submitError,
          submitSucceeded,
          invalid,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box mt={14} boxShadow = '0px 0px 25px 10px #F8F8FB' p={5} >
              <Box>
                <Typography color={"#000000"} fontFamily={"var(--josefin)"} fontSize={"32px"} fontWeight={700} >Login</Typography>
              </Box>
              <Box>
                <Typography fontSize={"17px"} fontFamily={"var(--lato)"} fontWeight={"400"} color={"#9096B2"} >Please login using account detail bellow.</Typography>
              </Box>
              <Box my={3}>
                <Field name="job_title">
                  {({ input, meta }) => (
                    <TextField
                      InputLabelProps={{sx:{"color":"#9096B2","fontFamily":"var(--lato)","fontWeight":"400","fontSize":"16px"}}}
                      {...input}
                      label="Email Address"
                      fullWidth
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Box>
              <Box mb={2}>
                <Field name="salary">
                  {({ input, meta }) => (
                    <TextField
                      InputLabelProps={{sx:{"color":"#9096B2","fontFamily":"var(--lato)","fontWeight":"400","fontSize":"16px"}}}
                      {...input}
                      label="Password"
                      fullWidth
                      mb={2}
                      error={!!(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Box>
              <Box display={"flex"} mb={2} justifyContent={"flex-start"} >
                <Typography color="#9096B2" fontFamily={"var(--lato)"} fontSize={"17px"} fontWeight={400} >Forgot your password?</Typography>
              </Box>
              <Box>
                  <Button
                    variant="contained"
                    style={{"backgroundColor":"#FB2E86","fontFamily":"16px","fontFamily":"16px","fontWeight":'700','fontFamily':"var(--lato)"}}
                    type="submit"
                    fullWidth
                  >
                    Sign In
                  </Button>
              </Box>
              <Box mt={2}>
                <Typography fontSize={"17px"} fontFamily={"var(--lato)"} fontWeight={"400"} color={"#9096B2"} >Don’t have an Account?Create account</Typography>
              </Box>
            </Box>
          </form>
        )}
      />
      </Box>
    </div>
  )
}

export default Login
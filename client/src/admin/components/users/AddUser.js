import { Form, Field } from "react-final-form";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import axios from "axios";
import { FORM_ERROR } from "final-form";
import TextInput from "../../../components/common/form/TextInput";
import SelectInput from "../../../components/common/form/SelectInput";
import { themeStyles } from "../../../styles";




function AddUser() {

  const handleSubmit = (data, form) => {
    const fields = form.getRegisteredFields(); // Get all the registered field names
    fields.forEach((field) => {
      form.resetFieldState(field); // Reset the touched state for each field
      form.change(field, null); // Reset the value of each field to null
    });
    // form.reset();
  };


  return (

    <Form
      onSubmit={(data, form) => {
        return (
          axios.post("http://localhost:5000/users/add", data)
            .then(result => {
              console.log(result)
            })
            .catch(err => {
              return { [FORM_ERROR]: err.message }
            })
        )
      }}
      validate={(data) => {
        const errors = {};

        // if (!data.name)
        //   errors.name = "name is Required";
        // else if (data.name.length < 3)
        //   errors.name = "Name Should be more then 3 Char";
        if (!data.email) errors.email = "Please Enter Email";
        if (!data.password) errors.password = "Please Enter Password";
        return errors
      }
      }
      initialValues={{
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
      }}
    >
      {
        prop => {
          const { submitSucceeded, submitError, submitting, invalid } = prop;

          return (
            <form
              className='formBody'
              onSubmit={prop.handleSubmit} >

              <Grid container>
                <Grid item md={3}></Grid>
                <Grid item md={6}>
                  <Field component={TextInput} type='text' name="name" placeholder="Enter Name" label="Name" />
                  <Field component={TextInput} type='email' name="email" placeholder="User Email" label="Email" />
                  <Field component={TextInput} type='number' name="phoneNumber" placeholder="Phone Number" label="Phone Number" />
                  <Field component={TextInput} type='password' name="password" placeholder="*****" label="Password" />
                  <Field component={SelectInput} name="type" label="Type" options={[{ label: "Super Admin", value: process.env.REACT_APP_USER_TYPE_SUPERADMIN }, { label: "Admin", value: process.env.REACT_APP_USER_TYPE_ADMIN }, { label: "Standard", value: process.env.REACT_APP_USER_TYPE_STANDARD }]} />

                </Grid>

                <Grid item md={12} mt={3} display="flex" justifyContent="center">
                  {
                    submitting ?
                      <LoadingButton style={{ ...themeStyles.discountBtn }} loading variant='outlined' >Submit</LoadingButton> :
                      <Button style={{ ...themeStyles.discountBtn, padding: "15px 54px" }} variant='contained' type='submit' disabled={invalid || submitting}>Submit</Button>

                  }
                </Grid>

              </Grid>
              <Box>

                {
                  submitError && <h2>{submitError}</h2>
                }


              </Box>
            </form>
          )

        }
      }
    </Form>

  )
}

export default AddUser
import { Alert, Avatar, Button, CircularProgress, Grid } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import { Field, Form } from 'react-final-form'
import { connect, useDispatch } from 'react-redux'
import TextInput from '../library/form/TextInput'
import EditIcon from '@mui/icons-material/Edit';
import { authUpdate, updateUser } from '../../store/actions/authActions'
import FileInput from "../library/form/FileInput";
import { showError, showSuccess } from '../../store/actions/alertActions'
import { hideProgressBar, showProgressBar } from '../../store/actions/progressActions'

function Profile({ user, authUpdate }) {
  const id = user._id;
  const dispatch = useDispatch();

  const validate = (data) => {
    const errors = {};

    if (!data.name)
      errors.name = "name is Required";
    else if (data.name.length < 3)
      errors.name = "Name Should be more then 3 Char";
    if (data.newPassword) {
      if (!data.currentPassword) errors.currentPassword = "Please enter current password";

      if (data.newPassword.length < 6)
        errors.newPassword = "Password should have at least 6 characters";
      if (!data.confirmPassword)
        errors.confirmPassword = "Please confirm password";

      if (data.confirmPassword && data.newPassword !== data.confirmPassword)
        errors.confirmPassword = "Passwords are not same";
    }

    return errors
  };



  const handleUpdateUser = async (data, form) => {
    try {
      dispatch(showProgressBar())
      let result = await axios.postForm("/users/profile-update", data);
      if (result.data.user) {

        dispatch( updateUser(result.data.user) );
        dispatch(showSuccess('Profile updated successfully'))
      }
      dispatch(hideProgressBar())

    } catch (error) {
      let message = error && error.response && error.response.data ? error.response.data.error : error.message;
      dispatch(hideProgressBar())
      dispatch(showError(message))
    }

  };


  return (
    <Box p={5}>
      <Grid
        container
      >
        <Grid
          item
          md={4}
          style={{ "borderRight": "1px solid #ececec" }}
        >
          <Box display={"flex"} pt={5} flexDirection="column" alignItems={"center"} textAlign={"center"} justifyContent={"center"}>
            <Avatar
              sx={{ height: "100px", width: "100px" }}
              src={ process.env.REACT_APP_URL + `content/${user._id}/${user.profile_picture}` }
            >
              {
                user.name.slice(0, 1)
              }
            </Avatar>
            <h3>{user.name}</h3>
          </Box>
        </Grid>
        <Grid item md={8} p={2}>
          <Box textAlign="center" maxWidth="500px" mx="auto">
            <Form
              onSubmit={handleUpdateUser}
              validate={validate}
              initialValues={
                {
                  name: user && user.name,
                  email: user && user.email,
                  phone_number: user && user.phone_number,
                  currentPassword: '',
                  newPassword: '',
                  confirmPassword: '',
                }
              }
              render={({
                handleSubmit,
                submitting,
                submitError,
                submitSucceeded,
                invalid,
              }) => (
                <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                  <Field component={TextInput} type='text' name="name" placeholder="Enter Name" label="Name" />
                  <Field component={TextInput} type='email' name="email" placeholder="User Email" label="Email" disabled />
                  <Field component={TextInput} type='number' name="phone_number" placeholder="Phone Number" label="Phone Number" />
                  <Field component={FileInput} name="profile_picture" inputProps={{ accept: "image/*" }} />
                  <Field component={TextInput} type='password' name="currentPassword" placeholder="Enter current passowrd" />
                  <Field component={TextInput} type='password' name="newPassword" placeholder="Enter new passowrd" />
                  <Field component={TextInput} type='password' name="confirmPassword" placeholder="Enter confirm passowrd" />
                  {submitting ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      sx={{ marginTop: '20px' }}
                      variant="contained"
                      color="success"
                      startIcon={<EditIcon />}
                      type="submit"
                      fullWidth
                      disabled={invalid}
                    >
                      Update
                    </Button>
                  )}

                </form>
              )}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

const mapStateToProps = (state) => {
  return (
    {
      user: state.auth.user
    }
  )
}

export default connect(mapStateToProps, { authUpdate })(Profile)
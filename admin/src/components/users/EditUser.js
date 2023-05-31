import EditIcon from '@mui/icons-material/Edit'; import { Alert, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { FORM_ERROR } from 'final-form';
import React from 'react'
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import SelectInput from '../library/form/SelectInput';
import TextInput from '../library/form/TextInput';
import { useDispatch } from "react-redux";
import { showSuccess } from "../../store/actions/alertActions";
import { userActionTypes } from '../../store/actions/userActions';



function EditUser({ users }) {
    const { id, rows, page } = useParams();
    const userIndex = users.findIndex(user => user._id === id);

    const user = users[userIndex];

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const validate = (data) => {
        const errors = {};

        if (!data.name)
            errors.name = "name is Required";
        else if (data.name.length < 3)
            errors.name = "Name Should be more then 3 Char";
        if (!data.email) errors.email = "Please Enter Email";
        if (!data.phone_number) errors.phone_number = "Please Enter Phone Number";
        if (!data.type) errors.type = "Please Select User Type";
        return errors
    };



    const handleUpdateUser = async (data, form) => {
        try {
            data.id = id;
            let result = await axios.post("/users/edit",
                data
            );

            const fields = form.getRegisteredFields(); // Get all the registered field names
            fields.forEach((field) => {
                form.resetFieldState(field); // Reset the touched state for each field
                form.change(field, null); // Reset the value of each field to null
            });
            dispatch({ type: userActionTypes.EDIT_USER, payload: { user: result.data.user, userIndex } })
            dispatch(showSuccess("User updated successfully"))
            navigate(`/admin/users/${rows}/${page}`);
            // Navigation will be added there
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return { [FORM_ERROR]: error.response.data.errors };
            }
            else
                return { [FORM_ERROR]: error.message };
        }

    };

    return (
        <Box textAlign="center" maxWidth="500px" mx="auto">
            <Form
                onSubmit={handleUpdateUser}
                validate={validate}
                initialValues={
                    {
                        name: user && user.name,
                        email: user && user.email,
                        phone_number: user && user.phone_number,
                        type: user && user.type,
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
                        <Field component={TextInput} type='email' name="email" placeholder="User Email" label="Email" />
                        <Field component={TextInput} type='number' name="phone_number" placeholder="Phone Number" label="Phone Number" />
                        <Field component={SelectInput} name="type" label="Type" options={[{ label: "Select user type", value: ' ' }, { label: "Super Admin", value: process.env.REACT_APP_USER_TYPE_SUPERADMIN }, { label: "Admin", value: process.env.REACT_APP_USER_TYPE_ADMIN }, { label: "Standard", value: process.env.REACT_APP_USER_TYPE_STANDARD }]} />

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
                                disabled={submitting || submitting}
                            >
                                Update User
                            </Button>
                        )}
                        {submitError && typeof submitError === 'string' && (
                            <Box mt={2}><Alert severity="error">{submitError}</Alert></Box>
                        )}

                        {submitError && Array.isArray(submitError) && (
                            <Box mt={2}>
                                {submitError.map((error, index) => (
                                    <Alert key={index} severity="error">{error}</Alert>
                                ))}
                            </Box>
                        )}
                        <Box mt={2}>
                            {/* {error && <Alert severity="error">{error}</Alert>} */}
                        </Box>
                        <Box mt={2}>
                            {submitSucceeded && !submitting && (
                                <Alert color="success">User Added Successfully</Alert>
                            )}
                        </Box>
                    </form>
                )}
            />
        </Box>
    )
}

const mapStatetoProps = (state) => {
    return {
        users: state.users.users
    }
}
const Wrapper = connect(mapStatetoProps)

export default Wrapper(EditUser);
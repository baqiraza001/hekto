import { Form, Field } from "react-final-form";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { AddCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { FORM_ERROR } from "final-form";
import { useEffect, useState } from "react";
import { useParams, redirect, useNavigate } from "react-router-dom";
import TextInput from "../library/form/TextInput";
import SelectInput from "../library/form/SelectInput";
import { useDispatch } from "react-redux";
import { showSuccess } from "../../store/actions/alertActions";
import { userActionTypes } from "../../store/actions/userActions";

function AddUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = (data) => {
        const errors = {};

        if (!data.name)
            errors.name = "name is Required";
        else if (data.name.length < 3)
            errors.name = "Name Should be more then 3 Char";
        if (!data.email) errors.email = "Please Enter Email";
        if (!data.password) errors.password = "Please Enter Password";
        if (!data.phone_number) errors.phone_number = "Please Enter Phone Number";
        if (!data.type || data.type == ' ') errors.type = "Please Select User Type";
        return errors
    };




    const handleAddUser = async (data, form) => {
        try {
            let result = await axios.post("/users/add",
                data
            );
            const fields = form.getRegisteredFields(); // Get all the registered field names
            fields.forEach((field) => {
                form.resetFieldState(field); // Reset the touched state for each field
                form.change(field, null); // Reset the value of each field to null
            });
            dispatch({ type: userActionTypes.ADD_USER, payload: result.data.user })
            dispatch(showSuccess("User added successfully"))
            navigate("/admin/users");
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
                onSubmit={handleAddUser}
                validate={validate}
                initialValues={{}}
                render={({
                    handleSubmit,
                    submitting,
                    submitError,
                }) => (
                    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                        <Field component={TextInput} type='text' name="name" placeholder="Enter Name" label="Name" />
                        <Field component={TextInput} type='email' name="email" placeholder="User Email" label="Email" />
                        <Field component={TextInput} type='number' name="phone_number" placeholder="Phone Number" label="Phone Number" />
                        <Field component={TextInput} type='password' name="password" placeholder="*****" label="Password" />
                        <Field component={SelectInput} name="type" label="Type" options={[{ label: "Select user type", value: ' ' }, { label: "Super Admin", value: process.env.REACT_APP_USER_TYPE_SUPERADMIN }, { label: "Admin", value: process.env.REACT_APP_USER_TYPE_ADMIN }, { label: "Standard", value: process.env.REACT_APP_USER_TYPE_STANDARD }]} />

                        {submitting ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                sx={{ marginTop: '20px' }}
                                variant="contained"
                                color="success"
                                startIcon={<AddCircleOutline />}
                                type="submit"
                                fullWidth
                                disabled={submitting}
                            >
                                Add User
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

                    </form>
                )}
            />
        </Box>
    );
}

export default AddUser;
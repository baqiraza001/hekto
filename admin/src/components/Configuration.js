import { Alert, Box, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import { FORM_ERROR } from 'final-form';
import React, { useEffect, useState } from 'react'
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { showError, showSuccess } from '../store/actions/alertActions';
import TextInput from './library/form/TextInput';
import EditIcon from '@mui/icons-material/Edit';
import FileInput from './library/form/FileInput';
import { authActionsType } from '../store/actions/authActions';


function Configuration() {

    const dispatch = useDispatch();
    const data = useSelector(({ auth }) => auth.configuration);

    const validate = (data) => {
        const errors = {};

        return errors
    };

    const handleUpdateData = async (data, form) => {
        try {
            axios.postForm(`/configuration/update`, data).then(result => {
                dispatch({ type: authActionsType.UPDATE_CONFIGURATION, payload: result.data })
                dispatch(showSuccess("Configuration updated successfully"))
            });
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
                onSubmit={handleUpdateData}
                // validate={validate}
                initialValues={
                    {
                        siteName: data.siteName,
                        address: data.address,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        logo: data.logo,
                        facebookLink: data.facebookLink,
                        twitterLink: data.twitterLink,
                        instagramLink: data.instagramLink
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
                        <Field component={TextInput} type='text' name="siteName" placeholder="Enter Site Name" label="Site Name" />
                        <Field component={FileInput} name="logo" inputProps={{ accept: "image/*" }} />
                        <Field component={TextInput} name="address" placeholder="address" label="Address" />
                        <Field component={TextInput} name="email" placeholder="email" label="Email" />
                        <Field component={TextInput} name="phoneNumber" placeholder="phoneNumber" label="Phone Number" />
                        <Field component={TextInput} name="facebookLink" placeholder="facebookLink" label="FaceBook Link" />
                        <Field component={TextInput} name="twitterLink" placeholder="twitterLink" label="Twitter Link" />
                        <Field component={TextInput} name="instagramLink" placeholder="instagramLink" label="Instagram Link" />
                        {submitting ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                sx={{ marginTop: '20px' }}
                                variant="contained"
                                color="success"
                                startIcon={<EditIcon />}
                                fullWidth
                                type="submit"
                            >
                                Update Configuration
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
                    </form>
                )}
            />
        </Box>
    )
}

export default Configuration
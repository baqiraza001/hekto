import EditIcon from '@mui/icons-material/Edit'; import { Alert, Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { FORM_ERROR } from 'final-form';
import React from 'react'
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { showError, showSuccess } from "../../store/actions/alertActions";
import TextInput from '../library/form/TextInput';
import { brandActionTypes } from '../../store/actions/brandsActions.js';



function EditBrand({ brands }) {
    const { id, rows, page } = useParams();
    const brandIndex = brands.findIndex(brand => brand._id === id);

    const brand = brands[brandIndex];

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const validate = (data) => {
        const errors = {};
        if (!data.name)
            errors.name = " Brand name is Required";
        else if (data.name.length < 3)
            errors.name = "Name Should be more then 3 Char";
        return errors
    };



    const handleUpdateBrand = async (data, form) => {
        try {
            data.id = id;
            let result = await axios.post(
                `/brands/edit`,
                data
            );

            dispatch({ type: brandActionTypes.EDIT_BRAND, payload: { brand: result.data.brand, brandIndex } })
            dispatch(showSuccess("Brand updated successfully"))
            navigate(`/admin/brands/${rows}/${page}`);
            // Navigation will be added there
        } catch (error) {
            let message = error && error.response && error.response.data ? error.response.data.error : error.message;
            dispatch(showError(message))
        }

    };

    return (
        <Box textAlign="center" maxWidth="500px" mx="auto">
            <Form
                onSubmit={handleUpdateBrand}
                validate={validate}
                initialValues={
                    {
                        name: brand && brand.name,
                        description: brand && brand.description
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
                        <Field component={TextInput} name="description" placeholder="Description" label="Description" />
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
                                disabled={submitting || invalid}
                            >
                                Update Brand
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

const mapStateToProps = (state) => {
    return {
        brands: state.brands.brands
    }
}
const Wrapper = connect(mapStateToProps)

export default Wrapper(EditBrand);
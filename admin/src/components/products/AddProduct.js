import { AddCircleOutline } from '@mui/icons-material'
import { Alert, Box, Button, CircularProgress } from '@mui/material'
import axios from 'axios'
import { FORM_ERROR } from 'final-form'
import React, { useEffect } from 'react'
import { Field, Form } from 'react-final-form'
import { connect, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { showSuccess } from '../../store/actions/alertActions'
import { loadCategories } from '../../store/actions/categoryActions'
import { productActionTypes } from '../../store/actions/productActions'
import SelectInput from '../library/form/SelectInput'
import TextAreaInput from '../library/form/TextAreaInput'
import TextInput from '../library/form/TextInput'

function AddProduct({ categories }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(loadCategories())
    }, [])

    const validate = (data) => {
        const errors = {};

        if (!data.name)
            errors.name = "Product Name is Required";
        else if (data.name.length < 3)
            errors.name = "Name Should be more then 3 Char";
        if (!data.price) errors.price = "Please Enter Price";
        if (!data.categoryId || data.categoryId == ' ') errors.categoryId = "Please Select Category";
        return errors
    };




    const handleAddProduct = async (data, form) => {
        try {
            let result = await axios.post(
                "http://localhost:5000/api/products/add",
                data
            );
            const fields = form.getRegisteredFields(); // Get all the registered field names
            fields.forEach((field) => {
                form.resetFieldState(field); // Reset the touched state for each field
                form.change(field, null); // Reset the value of each field to null
            });
            dispatch({ type: productActionTypes.ADD_PRODUCT, payload: result.data.product })
            dispatch(showSuccess("Product added successfully"))
            navigate("/admin/products");
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
                onSubmit={handleAddProduct}
                validate={validate}
                initialValues={{}}
                render={({
                    handleSubmit,
                    submitting,
                    submitError,
                }) => (
                    <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
                        <Field component={TextInput} type='text' name="name" placeholder="Enter Product Name" label="Name" />
                        <Field component={TextAreaInput} type='text' name="description" placeholder="Product Description" label="Description" />
                        <Field component={TextInput} type='number' name="price" placeholder="Product Price" label="Price" />
                        <Field component={TextInput} type='number' name="sale_price" placeholder="Sale Price" label="Sale Price" />
                        <Field
                            component={SelectInput}
                            name="categoryId"
                            label="Category"
                            options={

                                categories && categories.map(category => ({ label: category.name, value: category._id }))

                            } />

                        {submitting ? (
                            <CircularProgress />
                        ) : (
                            <Button
                                sx={{ marginTop: '20px' }}
                                variant="contained"
                                color="success"
                                startIcon={<AddCircleOutline />} type="submit"
                                fullWidth
                                disabled={submitting}
                            >
                                Add Product
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
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
    }
}

export default connect(mapStateToProps)(AddProduct);

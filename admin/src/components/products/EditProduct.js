import EditIcon from '@mui/icons-material/Edit';
import { Alert, Button, CircularProgress, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { FORM_ERROR } from 'final-form';
import { Field, Form } from 'react-final-form';
import { connect } from 'react-redux'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import SelectInput from '../library/form/SelectInput';
import TextInput from '../library/form/TextInput';
import { useDispatch } from "react-redux";
import { showSuccess } from "../../store/actions/alertActions";
import { productActionTypes } from '../../store/actions/productActions';
import TextAreaInput from '../library/form/TextAreaInput';
import React, { useEffect } from 'react'
import { loadAllCategories } from '../../store/actions/categoryActions'
import { loadAllBrands } from '../../store/actions/brandsActions.js';
import CheckBoxInput from '../library/form/CheckBoxInput';
import FileInput from '../library/form/FileInput';


function EditProduct({ products, categories, brands }) {
  const { id, rows, page } = useParams();
  const productIndex = products.findIndex(product => product._id === id);

  const product = products[productIndex];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllCategories())
    dispatch(loadAllBrands())
  }, [])

  if (!product)
    return <Navigate to="/admin/products" />



  const validate = (data) => {
    const errors = {};

    if (!data.name)
      errors.name = "Product name is required";
    else if (data.name.length < 3)
      errors.name = "Name should be more then 3 chararacters";
    if (!data.price) errors.price = "Please enter price";
    if (!data.categoryId) errors.categoryId = "Please select category";
    if (!data.shortDescription) errors.shortDescription = "Short description is required";

    if (data.sale_price) {
      if (parseFloat(data.price) < parseFloat(data.sale_price))
        errors.sale_price = "Product price should be greated than sale price"
    }

    if (data.discountPercentage) {
      if (data.discountPercentage < 0 || data.discountPercentage > 100)
        errors.discountPercentage = "Discount percentage must between 0 and 100%"
    }

    return errors
  };



  const handleUpdateUser = async (data, form) => {
    try {
      data.id = id;
      let result = await axios.postForm(
        `/products/edit`,
        data
      );

      dispatch({ type: productActionTypes.EDIT_PRODUCT, payload: { product: result.data.product, productIndex } })
      dispatch(showSuccess("Product updated successfully"))
      navigate(`/admin/products/${rows}/${page}`);
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
            name: product && product.name,
            shortDescription: product && product.shortDescription,
            price: product && product.price,
            sale_price: product && product.sale_price,
            discountPercentage: product && product.discountPercentage,
            categoryId: product && product.categoryId,
            brandId: product && product.brandId,
            color: product && product.color,
            tags: product && product.tags,
            longDescription: product && product.longDescription,
            additionalInformation: product && product.additionalInformation,
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
            <Field component={TextInput} type='text' name="name" placeholder="Enter Product Name" label="Name" />
            <Field component={TextAreaInput} type='text' name="shortDescription" placeholder="Product short description" label="Short description" />
            <Field component={TextInput} type='number' name="price" placeholder="Product Price" label="Price" />
            <Field component={TextInput} type='number' name="sale_price" placeholder="Sale Price" label="Sale Price" />
            <Field component={TextInput} type='number' name="discountPercentage" placeholder="Discount (%)" label="Discount percentage" />
            <Field component={TextInput} type='color' name="color" placeholder="Color" label="Color" />
            <Field component={TextInput} type='text' name="tags" placeholder="Product Tags" label="Tags" />
            <Field component={TextAreaInput} type='text' name="longDescription" placeholder="Product long description" label="Long Description" />
            <Field component={TextAreaInput} type='text' name="additionalInformation" placeholder="Additional information" label="Additional information" />
            <Field component={FileInput} name="productPictures" inputProps={{ accept: "image/*", multiple: true }} />

            {!categories && <FormHelperText>Add categories first</FormHelperText>}
            <Field
              component={SelectInput}
              name="categoryId"
              value={product.categoryId}
              label="Select category"
              options={categories && categories.map(category => ({ label: category.name, value: category._id }))}
            />

            {!brands && <FormHelperText>Add brands first</FormHelperText>}
            <Field
              component={SelectInput}
              name="brandId"
              value={product.brandId}
              label="Select brand"
              options={brands && brands.map(brand => ({ label: brand.name, value: brand._id }))}
            />

            <Field component={CheckBoxInput} type="checkbox" checked={product.isFeatured} name="isFeatured" label="Featured" />
            <Field component={CheckBoxInput} type="checkbox" checked={product.isTrending} name="isTrending" label="Trending" />
            <Field component={CheckBoxInput} type="checkbox" checked={product.isTop} name="isTop" label="Top" />

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
                Update Product
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

const mapStatetoProps = (state) => {
  return {
    products: state.products.products,
    categories: state.categories.allCategories,
    brands: state.brands.allBrands,
  }
}
const Wrapper = connect(mapStatetoProps)

export default Wrapper(EditProduct);
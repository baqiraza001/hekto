import { Form, Field } from "react-final-form";
import { Button, CircularProgress, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { AddCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextInput from "../library/form/TextInput";
import { showError, showSuccess } from "../../store/actions/alertActions";
import { useDispatch } from "react-redux";
import { addBrand, brandActionTypes } from "../../store/actions/brandsActions.js";

const AddBrand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const validate = (data) => {
    const errors = {};
    if (!data.name)
      errors.name = "Brand name is Required";
    else if (data.name.length < 3)
      errors.name = "Brand name Should be more then 3 Char";
    return errors
  };

  const handleAddBrand = async (data, form) => {
    try {
      let result = await axios.post( "/brands/add", data );
      dispatch(addBrand(result.data.brand));
      const fields = form.getRegisteredFields(); // Get all the registered field names
      fields.forEach((field) => {
        form.resetFieldState(field); // Reset the touched state for each field
        form.change(field, null); // Reset the value of each field to null
      });
      dispatch(showSuccess("Brand added successfully"))
      navigate("/admin/brands");
    } catch (err) {
      let message = err && err.response && err.response.data ? err.response.data.error : err.message;
      dispatch(showError(message))
    }

  };


  return (
    <Box textAlign="center" maxWidth="500px" mx="auto">
      <Form
        onSubmit={handleAddBrand}
        validate={validate}
        initialValues={{}}
        render={({
          handleSubmit,
          submitting,
          submitError,
          submitSucceeded,
          invalid,
        }) => (
          <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <Field component={TextInput} type='text' name="name" placeholder="Enter brand name" label="Brand Name" />
            <Field component={TextInput} name="description" placeholder="Enter brand description" label="Brand Description" />
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
                disabled={submitting || submitting}
              >
                Add Brand
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
  );
}

export default AddBrand
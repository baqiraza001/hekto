import { Form, Field } from "react-final-form";
import { Button, CircularProgress, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { AddCircleOutline } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextInput from "../library/form/TextInput";
import { showError, showSuccess } from "../../store/actions/alertActions";
import { useDispatch } from "react-redux";
import { addCategory, categoryActionTypes} from "../../store/actions/categoryActions";

const AddCategory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const validate = (data) => {
    const errors = {};
    if (!data.name)
      errors.name = "Category name is Required";
    else if (data.name.length < 3)
      errors.name = "Category name Should be more then 3 Char";
    return errors
  };

  const handleAddCategory = async (data, form) => {
    try {
      let result = await axios.post( "/categories/add", data );
      dispatch(addCategory(result.data.category));
      const fields = form.getRegisteredFields(); // Get all the registered field names
      fields.forEach((field) => {
        form.resetFieldState(field); // Reset the touched state for each field
        form.change(field, null); // Reset the value of each field to null
      });
      dispatch(showSuccess("Category added successfully"))
      navigate("/admin/categories");
    } catch (err) {
      let message = err && err.response && err.response.data ? err.response.data.error : err.message;
      dispatch(showError(message))
    }

  };


  return (
    <Box textAlign="center" maxWidth="500px" mx="auto">
      <Form
        onSubmit={handleAddCategory}
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
            <Field component={TextInput} type='text' name="name" placeholder="Enter Name" label="Name" />
            <Field component={TextInput} type='' name="description" placeholder="Enter Description" label="Description" />
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
                Add Category
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

export default AddCategory
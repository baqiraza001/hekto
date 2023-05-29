import axios from "axios";
import { showError, showSuccess } from "./alertActions";
import { hideProgressBar, showProgressBar } from "./progressActions";

export const productActionTypes = {
  "ADD_PRODUCT": "ADD_PRODUCT",
  "EDIT_PRODUCT": "EDIT_PRODUCT",
  "DELETE_PRODUCT": "DELETE_PRODUCT",
  "PRODUCTS_LOADED": "PRODUCTS_LOADED",
  "RESET_PRODUCT": "RESET_PRODUCT",
  "UPDATE_ROWS_PERPAGE": "UPDATE_ROWS_PERPAGE",
  "UPDATE_PAGINATION_CURRENT_PAGE": "UPDATE_PAGINATION_CURRENT_PAGE",
}





//Load All stores
export const loadProducts = (currentPage = 1, recordsPerPage = process.env.REACT_APP_RECORDS_PER_PAGE) => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.products.allRecordsLoaded) // don't send request again and again if all records have loaded
      return;

    let skipRecords = 0;
    if (state.products.products.length === 0)
      dispatch(showProgressBar());

    skipRecords = (parseInt(currentPage)) * parseInt(recordsPerPage);

    axios.get('/products', { params: { skip: skipRecords, limit: recordsPerPage } }).then(({ data }) => {
      const state = getState();
      if (state.products.products.length === 0)
        dispatch(hideProgressBar());

      if (data.totalRecords === 0) return;

      const allRecordsLoaded = (state.products.products.length + data.products.length) === data.totalRecords;
      dispatch({ type: productActionTypes.PRODUCTS_LOADED, payload: { products: data.products, totalRecords: data.totalRecords, allRecordsLoaded, page: currentPage } });
      dispatch({ type: productActionTypes.UPDATE_PAGINATION_CURRENT_PAGE, payload: currentPage })
    }).catch(err => {
      dispatch(hideProgressBar());
      dispatch(showError(err.response && err.response.data.message ? err.response.data.message : err.message));
    });
  }
}

export const deleteProduct = (id, page) => {
  return (dispatch) => {
    axios.delete('products/delete', { data: { id } }).then(() => {
      dispatch({ type: productActionTypes.DELETE_PRODUCT, payload: { id, page } })
      dispatch(showSuccess('Product deleted successfully'))
    }).catch(error => {
      dispatch(showError(error.message))
    })
  }
}
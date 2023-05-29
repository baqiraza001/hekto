import { showError, showSuccess } from "./alertActions";
import { hideProgressBar, showProgressBar } from "./progressActions";
import axios from 'axios';

export const brandActionTypes = {
  "ADD_BRAND": "ADD_BRAND",
  "EDIT_BRAND": "EDIT_BRAND",
  "DELETE_BRAND": "DELETE_BRAND",
  "BRANDS_LOADED": "BRANDS_LOADED",
  "RESET_BRAND": "RESET_BRAND",
  "UPDATE_ROWS_PERPAGE": "UPDATE_ROWS_PERPAGE",

  "UPDATE_PAGINATION_CURRENT_PAGE": "UPDATE_PAGINATION_CURRENT_PAGE",
  "ALL_BRANDS_LOADED": "ALL_BRANDS_LOADED",
  "UPDATE_DELETE_PAGINATION_PAGE": "UPDATE_DELETE_PAGINATION_PAGE",
}

export const addBrand = (brand) => {
  return {
    type: brandActionTypes.ADD_BRAND,
    payload: brand
  }
}

export const loadBrands = (currentPage = 1, recordsPerPage = process.env.REACT_APP_RECORDS_PER_PAGE) => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.brands.allRecordsLoaded) // don't send request again and again if all records have loaded
      return;

    let skipRecords = 0;
    if (state.brands.brands.length === 0) {
      dispatch(showProgressBar());
    }
    else
      skipRecords = (currentPage) * recordsPerPage;

    axios.get('/brands', { params: { skip: skipRecords, limit: recordsPerPage } }).then(({ data }) => {
      const state = getState();
      if (state.brands.brands.length === 0)
        dispatch(hideProgressBar());
        
      if(data.totalRecords === 0) return;

      const allRecordsLoaded = (state.brands.brands.length + data.brands.length) === data.totalRecords;
      dispatch({ type: brandActionTypes.BRANDS_LOADED, payload: { brands: data.brands, totalRecords: data.totalRecords, allRecordsLoaded, page: currentPage } });
      dispatch({ type: brandActionTypes.UPDATE_PAGINATION_CURRENT_PAGE, payload: currentPage })
    }).catch(err => {
      dispatch(hideProgressBar());
      dispatch(showError(err.response && err.response.data.message ? err.response.data.message : err.message));
    });
  }
}


export const deleteBrand = (id, page) => {
  return (dispatch) => {
    axios.delete('brands/delete', { data: { id } }).then(() => {
      dispatch({ type: brandActionTypes.DELETE_BRAND, payload: { id, page } })
      dispatch(showSuccess('Brand deleted successfully'))
    }).catch(error => {
      dispatch(showError(error.message))
    })
  }
}


export const loadAllBrands = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.brands.allBrandsLoaded) // don't send request again and again if all records have loaded
      return;

    dispatch(showProgressBar());
    axios.get('/brands/all').then(({ data }) => {
      dispatch(hideProgressBar());

      dispatch({ type: brandActionTypes.ALL_BRANDS_LOADED, payload: data.brands });
    }).catch(err => {
      dispatch(hideProgressBar());
      dispatch(showError(err.response && err.response.data.message ? err.response.data.message : err.message));
    });
  }
}
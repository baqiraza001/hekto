import { showError, showSuccess } from "./alertActions";
import { hideProgressBar, showProgressBar } from "./progressActions";
import axios from 'axios';

export const categoryActionTypes = {
  "ADD_CATEGORY": "ADD_CATEGORY",
  "EDIT_CATEGORY": "EDIT_CATEGORY",
  "DELETE_CATEGORY": "DELETE_CATEGORY",
  "CATEGORIES_LOADED": "CATEGORIES_LOADED",
  "RESET_CATEGORY": "RESET_CATEGORY",
  "UPDATE_ROWS_PERPAGE": "UPDATE_ROWS_PERPAGE",
  "UPDATE_PAGINATION_CURRENT_PAGE": "UPDATE_PAGINATION_CURRENT_PAGE",

  "ALL_CATEGORIES_LOADED": "ALL_CATEGORIES_LOADED",
}

export const addCategory = (category) => {
  return {
    type: categoryActionTypes.ADD_CATEGORY,
    payload: category
  }
}

export const loadCategories = (currentPage = 1, recordsPerPage = process.env.REACT_APP_RECORDS_PER_PAGE) => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.categories.allRecordsLoaded) // don't send request again and again if all records have loaded
      return;

    let skipRecords = 0;
    if (state.categories.categories.length === 0) {
      dispatch(showProgressBar());
    }
    else
      skipRecords = (currentPage) * recordsPerPage;

    axios.get('/categories', { params: { skip: skipRecords, limit: recordsPerPage } }).then(({ data }) => {
      const state = getState();
      if (state.categories.categories.length === 0)
        dispatch(hideProgressBar());

      if (data.totalRecords === 0) return;

      const allRecordsLoaded = (state.categories.categories.length + data.categories.length) === data.totalRecords;
      dispatch({ type: categoryActionTypes.CATEGORIES_LOADED, payload: { categories: data.categories, totalRecords: data.totalRecords, allRecordsLoaded, page: currentPage } });
      dispatch({ type: categoryActionTypes.UPDATE_PAGINATION_CURRENT_PAGE, payload: currentPage })
    }).catch(err => {
      dispatch(hideProgressBar());
      dispatch(showError(err.response && err.response.data.message ? err.response.data.message : err.message));
    });
  }
}


export const deleteCategory = (id, page) => {
  return (dispatch) => {
    axios.delete('categories/delete', { data: { id } }).then(() => {
      dispatch({ type: categoryActionTypes.DELETE_CATEGORY, payload: { id, page } })
      dispatch(showSuccess('Category deleted successfully'))
    }).catch(error => {
      dispatch(showError(error.message))
    })
  }
}

export const loadAllCategories = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.categories.allCategoriesLoaded) // don't send request again and again if all records have loaded
      return;

    dispatch(showProgressBar());
    axios.get('/categories/all').then(({ data }) => {

      dispatch(hideProgressBar());
      dispatch({ type: categoryActionTypes.ALL_CATEGORIES_LOADED, payload: data.categories });
    }).catch(err => {
      dispatch(hideProgressBar());
      dispatch(showError(err.response && err.response.data.message ? err.response.data.message : err.message));
    });
  }
}
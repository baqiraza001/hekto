import { showError, showSuccess } from "./alertActions";
import { hideProgressBar, showProgressBar } from "./progressActions";
import axios from 'axios';

export const userActionTypes = {
  "ADD_USER": "ADD_USER",
  "EDIT_USER": "EDIT_USER",
  "DELETE_USER": "DELETE_USER",
  "USERS_LOADED": "USERS_LOADED",
  "RESET_USER": "RESET_USER",
  "UPDATE_ROWS_PERPAGE": "UPDATE_ROWS_PERPAGE",
  "UPDATE_PAGINATION_CURRENT_PAGE": "UPDATE_PAGINATION_CURRENT_PAGE",
}

//Load All stores
export const loadUsers = (currentPage = 1, recordsPerPage = process.env.REACT_APP_RECORDS_PER_PAGE) => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.users.allRecordsLoaded) // don't send request again and again if all records have loaded
      return;

    let skipRecords = 0;
    if (state.users.users.length === 0)
      dispatch(showProgressBar());

    skipRecords = (parseInt(currentPage)) * parseInt(recordsPerPage);

    axios.get('/users', { params: { skip: skipRecords, limit: recordsPerPage } }).then(({ data }) => {
      const state = getState();
      if (state.users.users.length === 0)
        dispatch(hideProgressBar());

      if (data.totalRecords === 0) return;

      const allRecordsLoaded = (state.users.users.length + data.users.length) === data.totalRecords;
      dispatch({ type: userActionTypes.USERS_LOADED, payload: { users: data.users, totalRecords: data.totalRecords, allRecordsLoaded, page: currentPage } });
      dispatch({ type: userActionTypes.UPDATE_PAGINATION_CURRENT_PAGE, payload: currentPage })
    }).catch(err => {
      dispatch(hideProgressBar());
      dispatch(showError(err.response && err.response.data.message ? err.response.data.message : err.message));
    });
  }
}

export const deleteUser = (id, page) => {
  return (dispatch) => {
    axios.delete('/users/delete', { data: { id } }).then(() => {
      dispatch({ type: userActionTypes.DELETE_USER, payload: { id, page } })
      dispatch(showSuccess('User deleted successfully'))
    }).catch(error => {
      dispatch(showError(error.message))
    })
  }
}

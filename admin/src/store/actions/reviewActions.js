import axios from "axios";
import { showError, showSuccess } from "./alertActions";
import { hideProgressBar, showProgressBar } from "./progressActions";

export const reviewActionTypes = {
    "ADD_REVIEW": "ADD_REVIEW",
    "EDIT_REVIEW": "EDIT_REVIEW",
    "DELETE_REVIEW": "DELETE_REVIEW",
    "REVIEWS_LOADED": "REVIEWS_LOADED",
    "RESET_REVIEW": "RESET_REVIEW",
    "UPDATE_ROWS_PERPAGE": "UPDATE_ROWS_PERPAGE",
    "UPDATE_PAGINATION_CURRENT_PAGE": "UPDATE_PAGINATION_CURRENT_PAGE",
}



//Load All reviews
export const loadReviews = (currentPage = 1, recordsPerPage = process.env.REACT_APP_RECORDS_PER_PAGE, productId) => {
    return (dispatch, getState) => {
        const state = getState();

        if (state.reviews.allRecordsLoaded) // don't send request again and again if all records have loaded
            return;

        let skipRecords = 0;
        if (state.reviews.reviews.length === 0)
            dispatch(showProgressBar());

        skipRecords = (parseInt(currentPage)) * parseInt(recordsPerPage);

        axios.get('/reviews', { params: { skip: skipRecords, limit: recordsPerPage, productId } }).then(({ data }) => {
            const state = getState();
            if (state.reviews.reviews.length === 0)
                dispatch(hideProgressBar());

            const allRecordsLoaded = (state.reviews.reviews.length + data.reviews.length) === data.totalRecords;
            dispatch({ type: reviewActionTypes.REVIEWS_LOADED, payload: { reviews: data.reviews, totalRecords: data.totalRecords, allRecordsLoaded, page: currentPage } });
            dispatch({ type: reviewActionTypes.UPDATE_PAGINATION_CURRENT_PAGE, payload: currentPage })
        }).catch(err => {
            dispatch(hideProgressBar());
            dispatch(showError(err.response && err.response.data.message ? err.response.data.message : err.message));
        });
    }
}

export const deleteReview = (id, page) => {
    return (dispatch) => {
        axios.delete('reviews/delete', { data: { id } }).then(() => {
            dispatch({ type: reviewActionTypes.DELETE_REVIEW, payload: { id, page } })
            dispatch(showSuccess('Review deleted successfully'))
        }).catch(error => {
            dispatch(showError(error.message))
        })
    }
}
import { reviewActionTypes } from "../actions/reviewActions";

const initialState = {
    reviews: [],
    totalRecords: 0,
    allRecordsLoaded: false,
    paginationArray: [],
    rowsPerPage: process.env.REACT_APP_RECORDS_PER_PAGE,
    paginationCurrentPage: 0
}

function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case reviewActionTypes.ADD_REVIEW:
            let nenwReviewsArray = [...state.reviews];
            let oldPaginations = [...state.paginationArray];
            let lastPaginationPage = Math.ceil(parseInt(state.totalRecords) / parseInt(state.rowsPerPage)) - 1;
            let updatedAllRecordsLoaded = state.allRecordsLoaded;
            let updatedPaginationCurrentPage = state.paginationCurrentPage;

            if (lastPaginationPage < 0) {
                updatedAllRecordsLoaded = false;
            }

            if (oldPaginations[lastPaginationPage]) // if user already clicked on last page
            {
                nenwReviewsArray = [...state.reviews, action.payload];
                let lastPaginationRecord = oldPaginations[lastPaginationPage];
                let lastPaginationStartIndex = lastPaginationRecord.startIndex;
                let lastPaginationEndIndex = lastPaginationRecord.endIndex;
                if ((lastPaginationEndIndex - lastPaginationStartIndex) == (state.rowsPerPage)) // if last page has more than rowsPerPage Records, than add new page to pagination array
                {
                    updatedPaginationCurrentPage = lastPaginationPage + 1;
                    oldPaginations[lastPaginationPage + 1] = { startIndex: lastPaginationEndIndex, endIndex: lastPaginationEndIndex + 1 }
                }
                else { // update the lastPaginatinEndIndex to get the new record added
                    oldPaginations[lastPaginationPage] = { startIndex: lastPaginationStartIndex, endIndex: lastPaginationEndIndex + 1 }
                }
            }

            return {
                ...state,
                reviews: nenwReviewsArray,
                totalRecords: state.totalRecords + 1,
                paginationArray: oldPaginations,
                allRecordsLoaded: updatedAllRecordsLoaded,
                paginationCurrentPage: updatedPaginationCurrentPage
            }

        case reviewActionTypes.EDIT_REVIEW:
            let newReviewsForEditReview = [...state.reviews];
            newReviewsForEditReview[action.payload.reviewIndex] = action.payload.review;
            return {
                ...state,
                reviews: newReviewsForEditReview
            }

        case reviewActionTypes.DELETE_REVIEW:
            const newReviews = [...state.reviews];
            let reviewsForDeletedRecordPage = state.reviews.slice(state.paginationArray[action.payload.page].startIndex, state.paginationArray[action.payload.page].endIndex);
            const deletedRecordIndex = reviewsForDeletedRecordPage.findIndex(review => review._id === action.payload.id);
            let deletedRecord = reviewsForDeletedRecordPage[deletedRecordIndex];
            deletedRecord.is_deleted = true;
            newReviews[deletedRecordIndex] = deletedRecord;

            //code to be reviewed started
            // const deletedRecordIndex = state.users.findIndex(user => user._id === action.payload.id);
            // let updatedUsersArrayAfterUserDeleted = [...state.users];

            // let deleteRecordNextPage = state.paginationArray[action.payload.page + 1];
            // if (deleteRecordNextPage) {
            //     let deleteRecordNextUser = updatedUsersArrayAfterUserDeleted[deleteRecordNextPage.startIndex];
            //     updatedUsersArrayAfterUserDeleted[deletedRecordIndex] = deleteRecordNextUser;//assign the next page first user to the index where user will be deleted

            //     //remove the user from the next index of deleted record as this next index user is now shifted to the deleted record index
            //     updatedUsersArrayAfterUserDeleted.splice(deleteRecordNextPage.startIndex, 1);

            //     let lastPage = Math.ceil(parseInt(state.totalRecords) / parseInt(state.rowsPerPage)) - 1;
            //     state.paginationArray.map((paginationArrayObject, page) => {
            //         if (page > action.payload.page && page !== lastPage) {
            //             updatedUsersArrayAfterUserDeleted[paginationArrayObject.endIndex] = updatedUsersArrayAfterUserDeleted[state.paginationArray[page + 1].startIndex];
            //             updatedUsersArrayAfterUserDeleted.splice(state.paginationArray[page + 1].startIndex, 1);
            //         }
            //         return paginationArrayObject;
            //     })
            // }
            //code to be reviewed later: ended

            return {
                ...state,
                reviews: newReviews,
                // totalRecords: state.totalRecords - 1
            }
        case reviewActionTypes.REVIEWS_LOADED:
            let updatedReviewsArray = [...state.reviews, ...action.payload.reviews];
            let oldPaginationArray = [...state.paginationArray];

            if (action.payload.reviews) {
                let newPageRecord = { startIndex: state.reviews.length, endIndex: updatedReviewsArray.length };
                oldPaginationArray[action.payload.page] = newPageRecord;
            }

            return {
                ...state,
                totalRecords: action.payload.totalRecords,
                allRecordsLoaded: action.payload.allRecordsLoaded,
                reviews: updatedReviewsArray,
                paginationArray: oldPaginationArray
            }
        case reviewActionTypes.RESET_REVIEW:
            return initialState
        case reviewActionTypes.UPDATE_ROWS_PERPAGE:
            return { ...state, rowsPerPage: action.payload }
        case reviewActionTypes.UPDATE_PAGINATION_CURRENT_PAGE:
            return {
                ...state,
                paginationCurrentPage: action.payload
            }
        default:
            return state;
    }
}

export default reviewReducer
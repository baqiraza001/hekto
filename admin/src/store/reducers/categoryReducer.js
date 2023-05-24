import { categoryActionTypes } from "../actions/categoryActions";

const initialState = {
    categories: [],
    totalRecords: 0,
    allRecordsLoaded: false,
    paginationArray: [],
    rowsPerPage: process.env.REACT_APP_RECORDS_PER_PAGE,
    paginationCurrentPage: 0
}

function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case categoryActionTypes.ADD_CATEGORY:
            let nenwCategoriesArray = [...state.categories];
            let oldPaginations = [...state.paginationArray];
            let lastPaginationPage = Math.ceil(parseInt(state.totalRecords) / parseInt(state.rowsPerPage)) - 1;
            let updatedAllRecordsLoaded = state.allRecordsLoaded;
            let updatedPaginationCurrentPage = state.paginationCurrentPage;

            if (lastPaginationPage < 0) {
                updatedAllRecordsLoaded = false;
            }

            if (oldPaginations[lastPaginationPage]) // if user already clicked on last page
            {
                nenwCategoriesArray = [...state.categories, action.payload];
                let lastPaginationRecord = oldPaginations[lastPaginationPage];
                let lastPaginationStartIndex = lastPaginationRecord.startIndex;
                let lastPaginationEndIndex = lastPaginationRecord.endIndex;
                if ((lastPaginationEndIndex - lastPaginationStartIndex) === (state.rowsPerPage)) // if last page has more than rowsPerPage Records, than add new page to pagination array
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
                categories: nenwCategoriesArray,
                totalRecords: state.totalRecords + 1,
                paginationArray: oldPaginations,
                allRecordsLoaded: updatedAllRecordsLoaded,
                paginationCurrentPage: updatedPaginationCurrentPage
            }

        case categoryActionTypes.EDIT_CATEGORY:
            let newCategoriesForEditCategory = [...state.categories];
            newCategoriesForEditCategory[action.payload.categoryIndex] = action.payload.category;
            return {
                ...state,
                categories: newCategoriesForEditCategory
            }

        case categoryActionTypes.DELETE_CATEGORY:
            const newCategories = [...state.categories];
            let categoriesForDeletedRecordPage = state.categories.slice(state.paginationArray[action.payload.page].startIndex, state.paginationArray[action.payload.page].endIndex);
            const deletedRecordIndex = categoriesForDeletedRecordPage.findIndex(category => category._id === action.payload.id);
            let deletedRecord = categoriesForDeletedRecordPage[deletedRecordIndex];
            deletedRecord.is_deleted = true;
            newCategories[deletedRecordIndex] = deletedRecord;
            return {
                ...state,
                categories: newCategories,
            }
        case categoryActionTypes.CATEGORIES_LOADED:
            let updatedCategoriesArray = [...state.categories, ...action.payload.categories];
            let oldPaginationArray = [...state.paginationArray];

            if (action.payload.categories) {
                let newPageRecord = { startIndex: state.categories.length, endIndex: updatedCategoriesArray.length };
                oldPaginationArray[action.payload.page] = newPageRecord;
            }
            console.log(state.categories)
            return {
                ...state,
                totalRecords: action.payload.totalRecords,
                allRecordsLoaded: action.payload.allRecordsLoaded,
                categories: updatedCategoriesArray,
                paginationArray: oldPaginationArray
            }
        case categoryActionTypes.RESET_CATEGORY:
            return initialState
        case categoryActionTypes.UPDATE_ROWS_PERPAGE:
            return { ...state, rowsPerPage: action.payload }
        case categoryActionTypes.UPDATE_PAGINATION_CURRENT_PAGE:
            return {
                ...state,
                paginationCurrentPage: action.payload
            }
        default:
            return state;
    }
}

export default categoryReducer
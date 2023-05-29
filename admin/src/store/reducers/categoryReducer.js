import { categoryActionTypes } from "../actions/categoryActions";

const initialState = {
    categories: [],
    totalRecords: 0,
    allRecordsLoaded: false,
    paginationArray: [],
    rowsPerPage: process.env.REACT_APP_RECORDS_PER_PAGE,
    paginationCurrentPage: 0,
    allCategories: [],
    allCategoriesLoaded: false,
}

function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case categoryActionTypes.ADD_CATEGORY:
            let newCategoriesArray = [...state.categories];
            let oldPaginations = [...state.paginationArray];
            let lastPaginationPage = Math.ceil(parseInt(state.totalRecords) / parseInt(state.rowsPerPage)) - 1;
            let updatedAllRecordsLoaded = state.allRecordsLoaded;
            let updatedPaginationCurrentPage = state.paginationCurrentPage;
            let updatedTotalRecords = state.totalRecords;

            if (lastPaginationPage < 0) {
                updatedAllRecordsLoaded = false;
            }
            else
                updatedTotalRecords = state.totalRecords + 1;

            if (oldPaginations[lastPaginationPage]) // if user already clicked on last page
            {
                let lastPaginationRecord = oldPaginations[lastPaginationPage];
                let lastPaginationStartIndex = lastPaginationRecord.startIndex;
                let lastPaginationEndIndex = lastPaginationRecord.endIndex;

                let lastPaginationPageAfterNewRecord = Math.ceil(parseInt(state.totalRecords + 1) / parseInt(state.rowsPerPage)) - 1;

                if (lastPaginationPageAfterNewRecord !== lastPaginationPage) // if last page is not equal to newly calculated page, it means we have to add new page to pagination array
                {
                    let totalRowsPerPage = parseInt(state.rowsPerPage);

                    newCategoriesArray = [...state.categories, action.payload];
                    oldPaginations[lastPaginationPageAfterNewRecord] = { startIndex: newCategoriesArray.length - 1, endIndex: newCategoriesArray.length + totalRowsPerPage }

                    for (let index = 1; index < totalRowsPerPage; index++) {
                        newCategoriesArray.push(null);
                    }
                }
                else { // update the records array index to insert record at index which is null
                    for (let index = lastPaginationStartIndex; index < lastPaginationEndIndex; index++) {
                        if (!newCategoriesArray[index]) {
                            newCategoriesArray[index] = action.payload;
                            break;
                        }
                    }
                }
            }

            return {
                ...state,
                categories: newCategoriesArray,
                totalRecords: updatedTotalRecords,
                paginationArray: oldPaginations,
                allRecordsLoaded: updatedAllRecordsLoaded,
                paginationCurrentPage: updatedPaginationCurrentPage
            }

        case categoryActionTypes.EDIT_CATEGORY:
            let newCategoriesForEditCategory = [...state.categories];
            newCategoriesForEditCategory[action.payload.categoryIndex] = action.payload.category;
            return {
                ...state,
                categories: newCategoriesForEditCategory,
                allCategoriesLoaded: false
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
                allCategoriesLoaded: false
            }
        case categoryActionTypes.CATEGORIES_LOADED:
            let updatedCategoriesArray = [...state.categories, ...action.payload.categories];
            let oldPaginationArray = [...state.paginationArray];

            let totalRowsPerPage = parseInt(state.rowsPerPage);
            if (action.payload.categories.length < totalRowsPerPage) {
                const totalNullRecordsToInsert = totalRowsPerPage - action.payload.categories.length;

                for (let index = 0; index < totalNullRecordsToInsert; index++) {
                    updatedCategoriesArray.push(null);
                }
            }


            if (action.payload.categories) {
                let newPageRecord = { startIndex: state.categories.length, endIndex: updatedCategoriesArray.length };
                oldPaginationArray[action.payload.page] = newPageRecord;
            }

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

        case categoryActionTypes.ALL_CATEGORIES_LOADED:
            return { ...state, allCategories: action.payload, allCategoriesLoaded: true }
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
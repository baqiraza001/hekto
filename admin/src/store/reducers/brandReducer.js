import { brandActionTypes } from "../actions/brandsActions.js";

const initialState = {
    brands: [],
    totalRecords: 0,
    allRecordsLoaded: false,
    paginationArray: [],
    rowsPerPage: process.env.REACT_APP_RECORDS_PER_PAGE,
    paginationCurrentPage: 0,

    allBrands: [],
    allBrandsLoaded: false,
}

function brandReducer(state = initialState, action) {
    switch (action.type) {
        case brandActionTypes.ADD_BRAND:
            let nenwBrandsArray = [...state.brands];
            let oldPaginations = [...state.paginationArray];
            let lastPaginationPage = Math.ceil(parseInt(state.totalRecords) / parseInt(state.rowsPerPage)) - 1;
            let updatedAllRecordsLoaded = state.allRecordsLoaded;
            let updatedPaginationCurrentPage = state.paginationCurrentPage;

            if (lastPaginationPage < 0) {
                updatedAllRecordsLoaded = false;
            }

            if (oldPaginations[lastPaginationPage]) // if brand already clicked on last page
            {
                nenwBrandsArray = [...state.brands, action.payload];
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
                brands: nenwBrandsArray,
                totalRecords: state.totalRecords + 1,
                paginationArray: oldPaginations,
                allRecordsLoaded: updatedAllRecordsLoaded,
                paginationCurrentPage: updatedPaginationCurrentPage,
                allBrandsLoaded: false
            }

        case brandActionTypes.EDIT_BRAND:
            let newBrandsForEditBrand = [...state.brands];
            newBrandsForEditBrand[action.payload.brandIndex] = action.payload.brand;
            return {
                ...state,
                brands: newBrandsForEditBrand,
                allBrandsLoaded: false
            }

        case brandActionTypes.DELETE_BRAND:
            const newBrands = [...state.brands];
            let brandsForDeletedRecordPage = state.brands.slice(state.paginationArray[action.payload.page].startIndex, state.paginationArray[action.payload.page].endIndex);
            const deletedRecordIndex = brandsForDeletedRecordPage.findIndex(brand => brand._id === action.payload.id);
            let deletedRecord = brandsForDeletedRecordPage[deletedRecordIndex];
            deletedRecord.is_deleted = true;
            newBrands[deletedRecordIndex] = deletedRecord;

            //code to be reviewed started
            // const deletedRecordIndex = state.brands.findIndex(brand => brand._id === action.payload.id);
            // let updatedBrandsArrayAfterBrandDeleted = [...state.brands];

            // let deleteRecordNextPage = state.paginationArray[action.payload.page + 1];
            // if (deleteRecordNextPage) {
            //     let deleteRecordNextBrand = updatedBrandsArrayAfterBrandDeleted[deleteRecordNextPage.startIndex];
            //     updatedBrandsArrayAfterBrandDeleted[deletedRecordIndex] = deleteRecordNextBrand;//assign the next page first brand to the index where brand will be deleted

            //     //remove the brand from the next index of deleted record as this next index brand is now shifted to the deleted record index
            //     updatedBrandsArrayAfterBrandDeleted.splice(deleteRecordNextPage.startIndex, 1);

            //     let lastPage = Math.ceil(parseInt(state.totalRecords) / parseInt(state.rowsPerPage)) - 1;
            //     state.paginationArray.map((paginationArrayObject, page) => {
            //         if (page > action.payload.page && page !== lastPage) {
            //             updatedBrandsArrayAfterBrandDeleted[paginationArrayObject.endIndex] = updatedBrandsArrayAfterBrandDeleted[state.paginationArray[page + 1].startIndex];
            //             updatedBrandsArrayAfterBrandDeleted.splice(state.paginationArray[page + 1].startIndex, 1);
            //         }
            //         return paginationArrayObject;
            //     })
            // }
            //code to be reviewed later: ended

            return {
                ...state,
                brands: newBrands,
                allBrandsLoaded: false
                // totalRecords: state.totalRecords - 1
            }
        case brandActionTypes.BRANDS_LOADED:
            let updatedBrandsArray = [...state.brands, ...action.payload.brands];
            let oldPaginationArray = [...state.paginationArray];

            if (action.payload.brands) {
                let newPageRecord = { startIndex: state.brands.length, endIndex: updatedBrandsArray.length };
                oldPaginationArray[action.payload.page] = newPageRecord;
            }

            return {
                ...state,
                totalRecords: action.payload.totalRecords,
                allRecordsLoaded: action.payload.allRecordsLoaded,
                brands: updatedBrandsArray,
                paginationArray: oldPaginationArray
            }
        case brandActionTypes.RESET_BRAND:
            return initialState
        case brandActionTypes.UPDATE_ROWS_PERPAGE:
            return { ...state, rowsPerPage: action.payload }
        case brandActionTypes.UPDATE_PAGINATION_CURRENT_PAGE:
            return {
                ...state,
                paginationCurrentPage: action.payload
            }

        case brandActionTypes.ALL_BRANDS_LOADED:
            return { ...state, allBrands: action.payload, allBrandsLoaded: true }
        default:
            return state;
    }
}

export default brandReducer
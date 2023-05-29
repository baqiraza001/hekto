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
    paginationPageDeleted: false
}

function brandReducer(state = initialState, action) {
    switch (action.type) {
        case brandActionTypes.ADD_BRAND:
            let newBrandsArray = [...state.brands];
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

                    newBrandsArray = [...state.brands, action.payload];
                    oldPaginations[lastPaginationPageAfterNewRecord] = { startIndex: newBrandsArray.length - 1, endIndex: newBrandsArray.length + totalRowsPerPage }

                    for (let index = 1; index < totalRowsPerPage; index++) {
                        newBrandsArray.push(null);
                    }
                }
                else { // update the records array index to insert record at index which is null
                    for (let index = lastPaginationStartIndex; index < lastPaginationEndIndex; index++) {
                        if (!newBrandsArray[index]) {
                            newBrandsArray[index] = action.payload;
                            break;
                        }
                    }
                }
            }

            return {
                ...state,
                brands: newBrandsArray,
                totalRecords: updatedTotalRecords,
                paginationArray: oldPaginations,
                allRecordsLoaded: updatedAllRecordsLoaded,
                paginationCurrentPage: updatedPaginationCurrentPage
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
            newBrands[deletedRecordIndex] = null;

            let deletePaginationPage;
            brandsForDeletedRecordPage.forEach(record => {
                deletePaginationPage = !record ? true : false;
            });

            return {
                ...state,
                brands: newBrands,
                allBrandsLoaded: false,
                totalRecords: state.totalRecords - 1,
                paginationArray: deletePaginationPage ? state.paginationArray.splice(action.payload.page, 1) : state.paginationArray,
                paginationPageDeleted: deletePaginationPage ? true : false
            }
        case brandActionTypes.BRANDS_LOADED:
            let updatedBrandsArray = [...state.brands, ...action.payload.brands];
            let oldPaginationArray = [...state.paginationArray];

            let totalRowsPerPage = parseInt(state.rowsPerPage);
            if (action.payload.brands.length < totalRowsPerPage) {
                const totalNullRecordsToInsert = totalRowsPerPage - action.payload.brands.length;

                for (let index = 0; index < totalNullRecordsToInsert; index++) {
                    updatedBrandsArray.push(null);
                }
            }


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
        case brandActionTypes.UPDATE_DELETE_PAGINATION_PAGE:
            return { ...state, paginationPageDeleted: false }

        case brandActionTypes.ALL_BRANDS_LOADED:
            return { ...state, allBrands: action.payload, allBrandsLoaded: true }
        default:
            return state;
    }
}

export default brandReducer
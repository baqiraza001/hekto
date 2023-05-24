import { productActionTypes } from "../actions/productActions";

const initialState = {
    products: [],
    totalRecords: 0,
    allRecordsLoaded: false,
    paginationArray: [],
    rowsPerPage: process.env.REACT_APP_RECORDS_PER_PAGE,
    paginationCurrentPage: 0
}

function productReducer(state = initialState, action) {
    switch (action.type) {
        case productActionTypes.ADD_PRODUCT:
            let nenwProductsArray = [...state.products];
            let oldPaginations = [...state.paginationArray];
            let lastPaginationPage = Math.ceil(parseInt(state.totalRecords) / parseInt(state.rowsPerPage)) - 1;
            let updatedAllRecordsLoaded = state.allRecordsLoaded;
            let updatedPaginationCurrentPage = state.paginationCurrentPage;

            if (lastPaginationPage < 0) {
                updatedAllRecordsLoaded = false;
            }

            if (oldPaginations[lastPaginationPage]) // if user already clicked on last page
            {
                nenwProductsArray = [...state.products, action.payload];
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
                products: nenwProductsArray,
                totalRecords: state.totalRecords + 1,
                paginationArray: oldPaginations,
                allRecordsLoaded: updatedAllRecordsLoaded,
                paginationCurrentPage: updatedPaginationCurrentPage
            }

        case productActionTypes.EDIT_PRODUCT:
            let newProductsForEditProduct = [...state.products];
            newProductsForEditProduct[action.payload.productIndex] = action.payload.product;
            return {
                ...state,
                products: newProductsForEditProduct
            }

        case productActionTypes.DELETE_PRODUCT:
            const newProducts = [...state.products];
            let productsForDeletedRecordPage = state.products.slice(state.paginationArray[action.payload.page].startIndex, state.paginationArray[action.payload.page].endIndex);
            const deletedRecordIndex = productsForDeletedRecordPage.findIndex(product => product._id === action.payload.id);
            let deletedRecord = productsForDeletedRecordPage[deletedRecordIndex];
            deletedRecord.is_deleted = true;
            newProducts[deletedRecordIndex] = deletedRecord;

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
                products: newProducts,
                // totalRecords: state.totalRecords - 1
            }
        case productActionTypes.PRODUCTS_LOADED:
            let updatedProductsArray = [...state.products, ...action.payload.products];
            let oldPaginationArray = [...state.paginationArray];

            if (action.payload.products) {
                let newPageRecord = { startIndex: state.products.length, endIndex: updatedProductsArray.length };
                oldPaginationArray[action.payload.page] = newPageRecord;
            }

            return {
                ...state,
                totalRecords: action.payload.totalRecords,
                allRecordsLoaded: action.payload.allRecordsLoaded,
                products: updatedProductsArray,
                paginationArray: oldPaginationArray
            }
        case productActionTypes.RESET_PRODUCT:
            return initialState
        case productActionTypes.UPDATE_ROWS_PERPAGE:
            return { ...state, rowsPerPage: action.payload }
        case productActionTypes.UPDATE_PAGINATION_CURRENT_PAGE:
            return {
                ...state,
                paginationCurrentPage: action.payload
            }
        default:
            return state;
    }
}

export default productReducer
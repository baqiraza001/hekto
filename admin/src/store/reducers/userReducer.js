import { userActionTypes } from "../actions/userActions";

const initialState = {
    users: [],
    totalRecords: 0,
    allRecordsLoaded: false,
    paginationArray: [],
    rowsPerPage: process.env.REACT_APP_RECORDS_PER_PAGE,
    paginationCurrentPage: 0
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case userActionTypes.ADD_USER:
            let newUsersArray = [...state.users];
            let oldPaginations = [...state.paginationArray];
            let lastPaginationPage = Math.ceil(parseInt(state.totalRecords) / parseInt(state.rowsPerPage)) - 1;
            let updatedAllRecordsLoaded = state.allRecordsLoaded;
            let updatedPaginationCurrentPage = state.paginationCurrentPage;
            let updatedTotalRecords =  state.totalRecords;

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

                    newUsersArray = [...state.users, action.payload];
                    oldPaginations[lastPaginationPageAfterNewRecord] = { startIndex: newUsersArray.length - 1, endIndex: newUsersArray.length + totalRowsPerPage }

                    for (let index = 1; index < totalRowsPerPage; index++) {
                        newUsersArray.push(null);
                    }
                }
                else { // update the records array index to insert record at index which is null
                    for (let index = lastPaginationStartIndex; index < lastPaginationEndIndex; index++) {
                        if (!newUsersArray[index]) {
                            newUsersArray[index] = action.payload;
                            break;
                        }
                    }
                }
            }

            return {
                ...state,
                users: newUsersArray,
                totalRecords: updatedTotalRecords,
                paginationArray: oldPaginations,
                allRecordsLoaded: updatedAllRecordsLoaded,
                paginationCurrentPage: updatedPaginationCurrentPage
            }

        case userActionTypes.EDIT_USER:
            let newUsersForEditUser = [...state.users];
            newUsersForEditUser[action.payload.userIndex] = action.payload.user;
            return {
                ...state,
                users: newUsersForEditUser
            }

        case userActionTypes.DELETE_USER:
            const newUsers = [...state.users];
            let usersForDeletedRecordPage = state.users.slice(state.paginationArray[action.payload.page].startIndex, state.paginationArray[action.payload.page].endIndex);
            const deletedRecordIndex = usersForDeletedRecordPage.findIndex(user => user._id === action.payload.id);
            let deletedRecord = usersForDeletedRecordPage[deletedRecordIndex];
            deletedRecord.is_deleted = true;
            newUsers[deletedRecordIndex] = deletedRecord;

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
                users: newUsers,
                // totalRecords: state.totalRecords - 1
            }
            case userActionTypes.USERS_LOADED:
                let updatedUsersArray = [...state.users, ...action.payload.users];
                let oldPaginationArray = [...state.paginationArray];
    
                let totalRowsPerPage = parseInt(state.rowsPerPage);
                if (action.payload.users.length < totalRowsPerPage) {
                    const totalNullRecordsToInsert = totalRowsPerPage - action.payload.users.length;
    
                    for (let index = 0; index < totalNullRecordsToInsert; index++) {
                        updatedUsersArray.push(null);
                    }
                }
    
    
                if (action.payload.users) {
                    let newPageRecord = { startIndex: state.users.length, endIndex: updatedUsersArray.length };
                    oldPaginationArray[action.payload.page] = newPageRecord;
                }
    
                return {
                    ...state,
                    totalRecords: action.payload.totalRecords,
                    allRecordsLoaded: action.payload.allRecordsLoaded,
                    users: updatedUsersArray,
                    paginationArray: oldPaginationArray
                }
        case userActionTypes.RESET_USER:
            return initialState
        case userActionTypes.UPDATE_ROWS_PERPAGE:
            return { ...state, rowsPerPage: action.payload }
        case userActionTypes.UPDATE_PAGINATION_CURRENT_PAGE:
            return {
                ...state,
                paginationCurrentPage: action.payload
            }
        default:
            return state;
    }
}

export default userReducer
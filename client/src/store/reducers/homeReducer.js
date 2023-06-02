import { homeActionTypes } from "../actions/homeActions";

const initialState = {
    allRecordsLoaded: false,
    data: null,
    configuration: null
}

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case homeActionTypes.HOME_DATA_LOADED:
            return { ...state, data: action.payload.data, configuration: action.payload.configuration, allRecordsLoaded: true }
        default:
            return state;
    }
}

export default homeReducer
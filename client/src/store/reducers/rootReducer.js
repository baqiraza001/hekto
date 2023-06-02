import { combineReducers } from "redux";
import progressReducer from './progressReducer';
import alertReducer from "./alertReducer";
import homeReducer from "./homeReducer";

const allReducers = {
    progressBar: progressReducer,
    alert: alertReducer,
    home: homeReducer,
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;
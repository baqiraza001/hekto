import { combineReducers } from "redux";
import progressReducer from './progressReducer';
import userReducer from "./userReducer";
import alertReducer from "./alertReducer";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import categoryReducer from "./categoryReducer";
import brandReducer from "./brandReducer";

const allReducers = {
    users: userReducer,
    progressBar: progressReducer,
    alert: alertReducer,
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    brands: brandReducer,
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;
import { authActionsType } from "../actions/authActions"


const initState = {
    user: null,
    token: null,
    isLogined: false,
    userType: null,
}


const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authActionsType.SIGN_IN:
            return {
                ...state,
                user: action.user,
                token: action.token,
                userType: action.user.type,
                isLogined: true,
            }
        case authActionsType.LOAD_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case authActionsType.AUTH_LOADED:
            return {
                ...state,
                user: action.payload,
                userType: action.payload.type,
                isLogined: true
            }
        case authActionsType.AUTH_FAILED:
        case authActionsType.SIGN_OUT:
            return {
                ...state,
                user: null,
                token: null,
                isLogined: true,
                userType: null,
            }
        case authActionsType.AUTH_UPDATED:
            return {
                ...state,
                user: action.user
            }
        case authActionsType.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default authReducer;

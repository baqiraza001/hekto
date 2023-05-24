import axios from "axios";
import { showError } from "./alertActions";

export const authActionsType = {
    SIGN_IN: "signIn",
    SIGN_OUT: "signOut",
    AUTH_LOADED: "authLoaded",
    AUTH_FAILED: "authFailed",
    LOAD_TOKEN: "loadToken",
    AUTH_UPDATED: "authUpdated"
}

export const signin = (user, token) => {
    localStorage.setItem("token", token)
    return (
        {
            type: authActionsType.SIGN_IN,
            user,
            token
        }
    )
}

export const signOut = () => {
    localStorage.removeItem("token")
    return{
        type: authActionsType.SIGN_OUT
    }
}
export const loadAuth = () => {
    return (dispatch, getState) => {
  
      const token  = localStorage.getItem('token');
      dispatch({
        type: authActionsType.LOAD_TOKEN,
        token: token ? token : null
      })
  
      axios.get('/users/profile').then(result => {
        dispatch({ type: authActionsType.AUTH_LOADED, payload: result.data.user })
      }).catch(error => {
        if (token)
          dispatch(showError(error.message))
      })
    }
  }

export const authUpdate = (user) => ({type: authActionsType.AUTH_UPDATED, user})
import axios from "axios";
import { showError } from "./alertActions";

export const authActionsType = {
  SIGN_IN: "signIn",
  SIGN_OUT: "signOut",
  AUTH_LOADED: "authLoaded",
  AUTH_FAILED: "authFailed",
  LOAD_TOKEN: "loadToken",
  AUTH_UPDATED: "authUpdated",
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_CONFIGURATION: 'UPDATE_CONFIGURATION',
  DASHBAORD_DATA_LOADED: 'DASHBAORD_DATA_LOADED'
}

export const updateUser = (user) => ({ type: authActionsType.UPDATE_USER, payload: user });

export const signin = (user, token) => {
  return (dispatch, getState) => {
    localStorage.setItem("token", token)

    axios.get("/configuration").then(({ data }) => {
      dispatch({ type: authActionsType.UPDATE_CONFIGURATION, payload: data.configuration });
      dispatch({ type: authActionsType.DASHBAORD_DATA_LOADED, payload: { totalUsers: data.totalUsers, totalCategories: data.totalCategories, totalBrands: data.totalBrands, totalProducts: data.totalProducts } })
      dispatch({ type: authActionsType.SIGN_IN, user, token })
    })

  }
}

export const signOut = () => {
  localStorage.removeItem("token")
  return {
    type: authActionsType.SIGN_OUT
  }
}
export const loadAuth = () => {
  return (dispatch, getState) => {

    const token = localStorage.getItem('token');
    dispatch({
      type: authActionsType.LOAD_TOKEN,
      token: token ? token : null
    })

    axios.get('/users/profile').then(result => {
      axios.get("/configuration").then(({ data }) => {
        dispatch({ type: authActionsType.AUTH_LOADED, payload: { user: result.data.user, configuration: data.configuration } });
        dispatch({ type: authActionsType.DASHBAORD_DATA_LOADED, payload: { totalUsers: data.totalUsers, totalCategories: data.totalCategories, totalBrands: data.totalBrands, totalProducts: data.totalProducts } })
      })

    }).catch(error => {
      if (token)
        dispatch(showError(error.message))
    })
  }
}

export const authUpdate = (user) => ({ type: authActionsType.AUTH_UPDATED, user })
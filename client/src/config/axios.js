import axios from "axios"

export default function configureAxios(store) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;

  // handle response after sending auth header
  axios.interceptors.response.use(response => response, error => {
      return Promise.reject(error);
  })

}

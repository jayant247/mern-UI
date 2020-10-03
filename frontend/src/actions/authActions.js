import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_LOADNING,
  API_URL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS
} from "./types";


// logout user
export const login = ({ email, password }) => dispatch => {
    // Hearders
    const config = {
      headers: {
        "content-type": "application/json"
      }
    };
    // Request body
    const body = JSON.stringify({  email, password });

    axios
      .post(`${API_URL}/api/check`, body, config)
      .then(res =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL
        });
      });
  };
  


// logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};


// Register user
export const register = ({ name, email, password }) => dispatch => {
  // Hearders
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };
  // Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post(`${API_URL}/api/user/add`, body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// check token and load user

export const loadUser = () => (dispatch, getState) => {
  // user loadning
  dispatch({ type: USER_LOADNING });

  axios
    .get(`${API_URL}/api/getUser`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// setup config header and token

export const tokenConfig = getState => {
  // get token from local storage
  const token = getState().auth.token;

  // Hearders
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  // if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

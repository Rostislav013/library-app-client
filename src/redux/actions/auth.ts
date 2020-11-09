import axios from "axios";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "../../types";
import setAuthToken from "../../utils/setAuthToken";

// Register User
export const registerUser = (userData: any, history: any) => (
  dispatch: (arg0: { type: string; payload: any }) => any
) => {
  console.log("yoyoyoy");
  axios
    .post(
      "https://rost-library-app.herokuapp.com/api/v1/users/register",
      userData
    )
    .then((res) => history.push("/login")) // re-direct to login on successful register  CHECK IF IT WORKS
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// FIX, if move to type -> get issue
export type Decoded = {
  id?: string;
  email?: string;
};

// Login - get user token
export const loginUser = (userData: any) => (dispatch: any) => {
  axios
    .post("https://rost-library-app.herokuapp.com/api/v1/users/login", userData)
    .then((res) => {
      console.log(res);
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      //console.log(token)
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded: any = jwt_decode(token);
      //console.log(decoded)
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Set logged in user
export const setCurrentUser = (decoded: Decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch: any) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

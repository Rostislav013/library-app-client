import { Auth, GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "../../types";

//const isEmpty = require("is-empty");
//import isEmpty from "is-empty";

const initialState: Auth = {
  isAuthenticated: false,
  user: {
    id: "",
    email: "",
    exp: 0,
    admin: false,
    firstName: "",
  },
  loading: false,
  loginError: {},
};
// FIX
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: any) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true, //!isEmpty(action.payload),
        user: action.payload,
        loginError: {},
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ERRORS:
      return {
        ...state,
        loginError: action.payload,
      };
    default:
      return state;
  }
}

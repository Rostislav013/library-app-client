import { combineReducers } from "redux";

import product from "./product";
import auth from "./auth";

const createRootReducer = () =>
  combineReducers({
    product,
    auth,
  });

export default createRootReducer;

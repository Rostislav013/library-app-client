import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";

import { AppState } from "../types";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

const SavedProductStore = localStorage.getItem("fresh");
const productState = SavedProductStore
  ? JSON.parse(SavedProductStore)
  : { inCart: [] };

const initState: AppState = {
  product: productState,
  auth: {
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
  },
};

export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, thunk];
  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  sagaMiddleware.run(rootSaga);

  if ((module as any).hot) {
    (module as any).hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

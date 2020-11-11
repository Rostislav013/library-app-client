import { select, takeLatest } from "redux-saga/effects";

import {
  ADD_PRODUCT,
  AddProductAction,
  RemoveProductAction,
  REMOVE_PRODUCT,
} from "../../types";

function* saveProductLocally(action: AddProductAction | RemoveProductAction) {
  const state = yield select((state) => state.product);

  yield localStorage.setItem("fresh", JSON.stringify(state));
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [takeLatest([ADD_PRODUCT, REMOVE_PRODUCT], saveProductLocally)];

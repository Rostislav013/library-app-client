import { select, takeLatest } from 'redux-saga/effects'

import {
  ADD_PRODUCT,
  AddProductAction,
  RemoveProductAction,
  REMOVE_PRODUCT,
} from '../../types'

function* doSomethingWhenAddingProduct(
  action: AddProductAction | RemoveProductAction
) {
  const state = yield select((state) => state.product)

  yield localStorage.setItem('fresh', JSON.stringify(state))
}

export default [
  takeLatest([ADD_PRODUCT, REMOVE_PRODUCT], doSomethingWhenAddingProduct),
]

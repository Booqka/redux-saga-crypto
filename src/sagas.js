import axios from 'axios'
import {
  requestData,
  requestDataError, setBitcoinPrice, setEthereumPrice,
} from './actions'
import { GET_CRYPTO } from './actions/types'
import { put, call ,takeEvery } from 'redux-saga/effects'

export function* watchFetchCrypto() {
  yield takeEvery(GET_CRYPTO, fetchCryptoAsync)
}

export function* fetchCryptoAsync() {
  try {
    yield put(requestData())
    const bitcoin = yield call(() => axios.get(`https://api.coincap.io/v2/assets/bitcoin`))
    const ethereum = yield call(() => axios.get(`https://api.coincap.io/v2/assets/ethereum`))
    yield put(setBitcoinPrice(bitcoin.data.data.priceUsd))
    yield put(setEthereumPrice(ethereum.data.data.priceUsd))
  } catch (error) {
    yield put(requestDataError())
  }
}


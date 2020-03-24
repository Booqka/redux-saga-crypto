import { setCryptoPrice} from './actions'
import { put, call , take } from 'redux-saga/effects'
import initWebsocket from "./socketConnection"

export function* watchFetchCrypto() {
  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    const { payload } = action;
    for (let crypto in payload) {
      yield put(setCryptoPrice({name: crypto, value: payload[crypto]}))
    }
  }
}

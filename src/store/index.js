import { createStore, applyMiddleware }  from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import { watchFetchCrypto } from '../sagas'

const sagaMiddleware = createSagaMiddleware()

/* Create a function called configureStore */
export default function configureStore() {
  const Store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
  );

  sagaMiddleware.run(watchFetchCrypto)
  return Store
}


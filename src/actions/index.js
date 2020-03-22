import {
  GET_CRYPTO,
  REQUESTED_DATA,
  REQUESTED_DATA_FAILED,
  SET_BITCOIN_PRICE,
  SET_ETHEREUM_PRICE
} from './types'

export const requestData = () => {
  return { type: REQUESTED_DATA }
};

export const setBitcoinPrice = (price) => {
  return { type: SET_BITCOIN_PRICE, price }
};

export const setEthereumPrice = (price) => {
  return { type: SET_ETHEREUM_PRICE, price }
};

export const requestDataError = () => {
  return { type: REQUESTED_DATA_FAILED }
};

export const fetchCrypto = () => {
  return { type: GET_CRYPTO }
};



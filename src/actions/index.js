import {
  GET_CRYPTO,
  REQUESTED_DATA,
  REQUESTED_DATA_FAILED,
  SET_CRYPTO_PRICE,
} from './types';

export const requestData = () => {
  return { type: REQUESTED_DATA }
};

export const setCryptoPrice = (crypto) => {
  return { type: SET_CRYPTO_PRICE, crypto }
};

export const requestDataError = () => {
  return { type: REQUESTED_DATA_FAILED }
};

export const fetchCrypto = () => {
  return { type: GET_CRYPTO }
};

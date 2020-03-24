import initialState from './initialState'
import {
  REQUESTED_DATA,
  REQUESTED_DATA_SUCCEEDED,
  REQUESTED_DATA_FAILED,
  SET_CRYPTO_PRICE
} from '../actions/types'

export default function reducers(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_DATA:
      return {
        ...state,
        loading: true,
      };
    case REQUESTED_DATA_SUCCEEDED:
      return {
        ...state,
        orders: action.orders,
      };
    case REQUESTED_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case SET_CRYPTO_PRICE:
      const { crypto } = action;
      let { cryptos } = state;
      updateCrypto(crypto, cryptos)
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

const updateCrypto = (crypto, list) => {
  let item = list.find(x => x.name === crypto.name);
  item.growth = item.price < crypto.value;
  item.price = crypto.value;
};

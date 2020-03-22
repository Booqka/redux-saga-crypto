import initialState from './initialState'
import {
  REQUESTED_DATA,
  REQUESTED_DATA_SUCCEEDED,
  REQUESTED_DATA_FAILED,
  SET_BITCOIN_PRICE, SET_ETHEREUM_PRICE
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
    case SET_BITCOIN_PRICE:
      return {
        ...state,
        BTC: action.price,
        loading: false,
      };
    case SET_ETHEREUM_PRICE:
      return {
        ...state,
        ETH: action.price,
        loading: false,
      };
    default:
      return state;
  }
}

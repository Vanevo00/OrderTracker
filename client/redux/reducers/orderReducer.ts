import * as types from '../types'
import { NO_USER_FOR_ORDERS } from '../types'

interface orderReducerArgs {
  type: string
  payload?: any
}

const initialOrderState = {
  loadingOrders: true,
  orders: [],
  activeOrder: undefined
}

export const orderReducer = (state = initialOrderState, { type, payload }: orderReducerArgs) => {
  switch (type) {
    case types.SET_ORDERS:
      return {
        ...state,
        orders: payload,
        activeOrder: payload[0],
        loadingOrders: false
      }
    case types.SET_ACTIVE_ORDER:
      return {
        ...state,
        activeOrder: payload
      }
    case NO_USER_FOR_ORDERS:
    default:
      return state
  }
}

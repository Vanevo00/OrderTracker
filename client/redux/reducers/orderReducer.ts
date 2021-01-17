import * as types from '../types'

interface orderReducerArgs {
  type: string
  payload?: any
}

const initialOrderState = {
  loadingOrders: true,
  orders: []
}

export const orderReducer = (state = initialOrderState, { type, payload }: orderReducerArgs) => {
  switch (type) {
    case types.SET_ORDERS:
      return {
        ...state,
        orders: payload,
        loadingOrders: false
      }
    default:
      return state
  }
}

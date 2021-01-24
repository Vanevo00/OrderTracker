import * as types from '../types'
import { NO_USER_FOR_ORDERS, ORDER_SAVED } from '../types'
import { IOrderPopulated } from '../../../types/Order'

interface orderReducerArgs {
  type: string
  payload?: any
}

const initialOrderState = {
  loadingOrders: true,
  orders: [],
  activeOrder: {
    phone: undefined
  },
  userStartedTyping: false,
  orderSaveStatus: undefined
}

const updateActiveOrderInOrders = (orders: IOrderPopulated[], payload: IOrderPopulated) => {
  return orders.map((order) => {
    if (order._id === payload._id) {
      return payload
    } else {
      return order
    }
  })
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
        userStartedTyping: false,
        activeOrder: payload,
        orderSaveStatus: undefined
      }
    case types.UPDATE_ACTIVE_ORDER:
      return {
        ...state,
        userStartedTyping: true,
        activeOrder: payload,
        orders: updateActiveOrderInOrders(state.orders, payload),
        orderSaveStatus: 'ukládám...'
      }
    case ORDER_SAVED:
      return {
        ...state,
        orderSaveStatus: `uloženo v ${payload}`
      }
    case NO_USER_FOR_ORDERS:
    default:
      return state
  }
}

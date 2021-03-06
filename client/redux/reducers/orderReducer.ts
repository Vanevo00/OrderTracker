import * as types from '../types'
import { IOrderPopulated } from '../../../types/Order'

interface orderReducerArgs {
  type: string
  payload?: any
}

const initialOrderState = {
  loadingOrders: true,
  orders: [],
  activeOrder: {},
  userStartedTyping: false,
  orderSaveStatus: undefined,
  orderErrors: {}
}

const updateActiveOrderInOrders = (orders: IOrderPopulated[], payload: any) => {
  return orders.map((order) => {
    if (order._id === payload._id) {
      return payload
    } else {
      return order
    }
  })
}

const removeArchivedOrderFromOrders = (orders: IOrderPopulated[], archivedOrderId: string) => orders.filter((order) => order._id !== archivedOrderId)

export const orderReducer = (state = initialOrderState, { type, payload }: orderReducerArgs) => {
  switch (type) {
    case types.SET_ORDERS:
      return {
        ...state,
        orders: payload,
        loadingOrders: false
      }
    case types.LOADING_COMMENCED:
      return {
        ...state,
        loadingOrders: true
      }
    case types.SET_ACTIVE_ORDER:
      return {
        ...state,
        userStartedTyping: false,
        activeOrder: payload,
        orderSaveStatus: undefined,
        orderErrors: initialOrderState.orderErrors
      }
    case types.REMOVE_ACTIVE_ORDER:
      return {
        ...state,
        activeOrder: initialOrderState.activeOrder,
        userStartedTyping: initialOrderState.userStartedTyping
      }
    case types.START_NEW_ORDER:
      return {
        ...state,
        orders: [
          payload,
          ...state.orders
        ],
        userStartedTyping: false,
        activeOrder: payload,
        orderSaveStatus: 'zatím neuloženo',
        orderErrors: initialOrderState.orderErrors
      }
    case types.UPDATE_ACTIVE_ORDER:
      return {
        ...state,
        userStartedTyping: true,
        activeOrder: payload,
        orders: updateActiveOrderInOrders(state.orders, payload),
        orderSaveStatus: 'ukládám...'
      }
    case types.ORDER_SAVED:
      return {
        ...state,
        orderSaveStatus: `uloženo v ${payload}`,
        orderErrors: initialOrderState.orderErrors
      }
    case types.SUPPLIER_ADDED:
      return {
        ...state,
        activeOrder: {
          ...state.activeOrder,
          supplier: payload
        },
        orders: updateActiveOrderInOrders(state.orders, {
          ...state.activeOrder,
          supplier: payload
        }),
        userStartedTyping: true
      }
    case types.ORDER_ARCHIVED:
      return {
        ...state,
        orders: removeArchivedOrderFromOrders(state.orders, payload)
      }
    case types.ORDER_ERROR:
      return {
        ...state,
        orderSaveStatus: 'chyba při posledním uložení formuláře',
        orderErrors: payload
      }
    case types.NO_USER_FOR_ORDERS:
    default:
      return state
  }
}

import { Dispatch } from 'redux'
import * as types from '../types'
import { apolloClient } from '../../apollo/apollo'
import { IOrderPopulated } from '../../../types/Order'
import getCurrentTime from '../../utils/getCurrentTime'
import { UPDATE_ORDER } from '../../apollo/mutations/updateOrder'
import { GET_ORDERS } from '../../apollo/queries/getOrders'

export const setOrders = () => async (dispatch: Dispatch) => {
  try {
    const {
      data: {
        findOrdersByUser: payload
      }
    } = await apolloClient.query({
      query: GET_ORDERS
    })

    dispatch({
      type: types.SET_ORDERS,
      payload
    })
  } catch {
    dispatch({
      type: types.NO_USER_FOR_ORDERS
    })
  }
}

export const setActiveOrder = (payload: IOrderPopulated) => (dispatch: Dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_ORDER,
    payload
  })
}

export const updateActiveOrder = (payload: IOrderPopulated) => (dispatch: Dispatch) => {
  dispatch({
    type: types.UPDATE_ACTIVE_ORDER,
    payload
  })
}

export const saveUpdatedOrder = (payload: IOrderPopulated) => async (dispatch: Dispatch) => {
  try {
    apolloClient.mutate({
      mutation: UPDATE_ORDER,
      variables: {
        ...payload,
        supplier: payload.supplier._id
      }
    })

    dispatch({
      type: types.ORDER_SAVED,
      payload: getCurrentTime()
    })
  } catch (err) {
    dispatch({
      type: types.ORDER_SAVE_ERROR
    })
  }
}

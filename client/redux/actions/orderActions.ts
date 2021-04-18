import { Dispatch } from 'redux'
import * as types from '../types'
import { apolloClient } from '../../apollo/apollo'
import { IOrderPopulated } from '../../../types/Order'
import getCurrentTime from '../../utils/getCurrentTime'
import { UPDATE_ORDER } from '../../apollo/mutations/updateOrder'
import { GET_ORDERS } from '../../apollo/queries/getOrders'
import { VALIDATION_ERROR } from '../../../common/errorCodes'
import { CREATE_EMPTY_ORDER } from '../../apollo/mutations/createEmptyOrder'

export const setOrders = () => async (dispatch: Dispatch) => {
  try {
    const {
      data: {
        findOrdersByUser: payload
      }
    } = await apolloClient.query({
      query: GET_ORDERS,
      variables: {
        archived: false
      }
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

export const startNewOrder = () => async (dispatch: Dispatch) => {
  const {
    data: {
      createOrder: payload
    }
  } = await apolloClient.mutate({
    mutation: CREATE_EMPTY_ORDER
  })

  dispatch({
    type: types.START_NEW_ORDER,
    payload
  })
}

export const setActiveOrder = (payload: IOrderPopulated) => (dispatch: Dispatch) => {
  dispatch({
    type: types.SET_ACTIVE_ORDER,
    payload
  })
}

export const removeActiveOrder = () => (dispatch: Dispatch) => {
  dispatch({
    type: types.REMOVE_ACTIVE_ORDER
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
    await apolloClient.mutate({
      mutation: UPDATE_ORDER,
      variables: {
        ...payload,
        supplier: payload.supplier?._id
      }
    })

    dispatch({
      type: types.ORDER_SAVED,
      payload: getCurrentTime()
    })
  } catch (err) {
    if (err.graphQLErrors && err.graphQLErrors[0].message === VALIDATION_ERROR) {
      dispatch({
        type: types.ORDER_ERROR,
        payload: err.graphQLErrors[0].extensions.errors
      })
    } else {
      console.log('saveUpdatedOrder error:', err)
      dispatch({
        type: types.ORDER_ERROR,
        payload: {
          general: 'vyskytla se chyba, zkuste to prosím později'
        }
      })
    }
  }
}

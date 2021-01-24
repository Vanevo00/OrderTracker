import { Dispatch } from 'redux'
import * as types from '../types'
import { apolloClient } from '../../apollo/apollo'
import { gql } from '@apollo/client'
import { IOrderPopulated } from '../../../types/Order'
import getCurrentTime from '../../utils/getCurrentTime'

const GET_ORDERS = gql`
  query {
    findOrdersByUser {
      _id
      supplier {
        _id
        name
        abbreviation
      }
      name
      client
      phone
      email
      product
      notes
      smsSent
      pickedUp
      toBeReadyOn
      updated
      created
    }
}
`

const UPDATE_ORDER = gql`
    mutation (
        $_id: ID!
        $supplier: ID!
        $name: String!
        $client: String!
    ) {
        updateOrder(
            _id: $_id
            supplier: $supplier
            name: $name
            client: $client
        )
    }
`

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

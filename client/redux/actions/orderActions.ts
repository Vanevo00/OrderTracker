import { Dispatch } from 'redux'
import * as types from '../types'
import { apolloClient } from '../../apollo/apollo'
import { gql } from '@apollo/client'
import { IOrderPopulated } from '../../../types/Order'

const GET_ORDERS = gql`
    query {
        findOrdersByUser {
            _id
            supplier {
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

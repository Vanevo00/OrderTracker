import { Dispatch } from 'redux'
import { apolloClient } from '../../apollo/apollo'
import * as types from '../types'
import { GET_SUPPLIERS } from '../../apollo/queries/getSuppliers'

export const setSuppliers = () => async (dispatch: Dispatch) => {
  try {
    const {
      data: {
        findSuppliersByUser: payload
      }
    } = await apolloClient.query({
      query: GET_SUPPLIERS
    })

    dispatch({
      type: types.SET_SUPPLIERS,
      payload
    })
  } catch {
    dispatch({
      type: types.NO_USER_FOR_SUPPLIERS
    })
  }
}

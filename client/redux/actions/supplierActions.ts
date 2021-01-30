import { Dispatch } from 'redux'
import { apolloClient } from '../../apollo/apollo'
import * as types from '../types'
import { GET_SUPPLIERS } from '../../apollo/queries/getSuppliers'
import { ISupplierArgs } from '../../../types/Supplier'
import { CREATE_SUPPLIER } from '../../apollo/mutations/createSupplier'

export const setSuppliers = () => async (dispatch: Dispatch) => {
  try {
    const {
      data: {
        findSuppliersByUser: payload
      }
    } = await apolloClient.query({
      query: GET_SUPPLIERS,
      variables: {
        sorting: {
          key: 'name'
        }
      }
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

export const showSupplierModal = (dispatch: Dispatch) => {
  dispatch({
    type: types.SHOW_SUPPLIER_MODAL
  })
}

export const hideSupplierModal = (dispatch: Dispatch) => {
  dispatch({
    type: types.HIDE_SUPPLIER_MODAL
  })
}

export const createSupplier = (supplier: ISupplierArgs) => async (dispatch: Dispatch) => {
  try {
    const {
      data: {
        createSupplier: payload
      }
    } = await apolloClient.mutate({
      mutation: CREATE_SUPPLIER,
      variables: supplier
    })

    dispatch({
      type: types.SUPPLIER_ADDED,
      payload
    })
  } catch (err) {
    console.log(err)
  }
}

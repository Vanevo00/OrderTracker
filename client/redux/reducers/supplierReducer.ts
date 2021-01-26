import * as types from '../types'

interface supplierReducerArgs {
  type: string
  payload?: any
}

const initialSupplierState = {
  suppliers: [],
  showSupplierModal: false
}

export const supplierReducer = (state = initialSupplierState, { type, payload }: supplierReducerArgs) => {
  switch (type) {
    case types.SET_SUPPLIERS:
      return {
        ...state,
        suppliers: payload
      }
    case types.SHOW_SUPPLIER_MODAL:
      return {
        ...state,
        showSupplierModal: true
      }
    case types.HIDE_SUPPLIER_MODAL:
      return {
        ...state,
        showSupplierModal: false
      }
    case types.SUPPLIER_ADDED:
      return {
        ...state,
        showSupplierModal: false,
        suppliers: [
          ...state.suppliers,
          payload
        ]
      }
    default:
      return state
  }
}

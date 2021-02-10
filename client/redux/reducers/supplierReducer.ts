import * as types from '../types'

interface supplierReducerArgs {
  type: string
  payload?: any
}

const initialSupplierState = {
  suppliers: [],
  showSupplierModal: false,
  addSupplierErrors: {}
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
        showSupplierModal: false,
        addSupplierErrors: initialSupplierState.addSupplierErrors
      }
    case types.SUPPLIER_ADDED:
      return {
        ...state,
        showSupplierModal: false,
        suppliers: [
          ...state.suppliers,
          payload
        ],
        addSupplierErrors: initialSupplierState.addSupplierErrors
      }
    case types.ADD_SUPPLIER_ERROR:
      return {
        ...state,
        addSupplierErrors: payload
      }
    default:
      return state
  }
}

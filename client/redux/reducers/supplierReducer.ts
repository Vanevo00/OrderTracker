import * as types from '../types'

interface supplierReducerArgs {
  type: string
  payload?: any
}

const initialSupplierState = {
  suppliers: []
}

export const supplierReducer = (state = initialSupplierState, { type, payload }: supplierReducerArgs) => {
  switch (type) {
    case types.SET_SUPPLIERS:
      return {
        ...state,
        suppliers: payload
      }
    default:
      return state
  }
}

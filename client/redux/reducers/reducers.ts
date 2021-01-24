import { userReducer } from './userReducer'
import { combineReducers } from 'redux'
import { deviceReducer } from './deviceReducer'
import { orderReducer } from './orderReducer'
import { supplierReducer } from './supplierReducer'

const reducers = {
  userState: userReducer,
  deviceState: deviceReducer,
  orderState: orderReducer,
  supplierState: supplierReducer
}

export default combineReducers(reducers)

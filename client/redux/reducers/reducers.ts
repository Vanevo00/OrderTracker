import { userReducer } from './userReducer'
import { combineReducers } from 'redux'
import { deviceReducer } from './deviceReducer'
import { orderReducer } from './orderReducer'

const reducers = {
  userState: userReducer,
  deviceState: deviceReducer,
  orderState: orderReducer
}

export default combineReducers(reducers)

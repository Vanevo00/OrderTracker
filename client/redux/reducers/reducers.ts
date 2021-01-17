import { userReducer } from './userReducer'
import { combineReducers } from 'redux'
import { deviceReducer } from './deviceReducer'

const reducers = {
  userState: userReducer,
  deviceState: deviceReducer
}

export default combineReducers(reducers)

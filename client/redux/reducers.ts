import { userReducer } from './userReducer'
import { combineReducers } from 'redux'

const reducers = {
  userState: userReducer
}

export default combineReducers(reducers)

import * as types from '../types'

interface userReducerArgs {
  type: string
  payload?: any
}

const initialUserState = {
  loadingFinished: false,
  user: {}
}

export const userReducer = (state = initialUserState, { type, payload }: userReducerArgs) => {
  switch (type) {
    case types.SET_USER:
      return {
        ...state,
        loadingFinished: true,
        user: payload
      }
    case types.LOGOUT_USER:
    case types.USER_NOT_FOUND:
      return {
        ...state,
        loadingFinished: true,
        user: initialUserState.user
      }
    default:
      return state
  }
}

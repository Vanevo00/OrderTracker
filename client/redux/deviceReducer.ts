import * as types from './types'

interface deviceReducerArgs {
  type: string
  payload?: any
}

const initialDeviceState = {
  device: 'desktop'
}

export const deviceReducer = (state = initialDeviceState, { type, payload }: deviceReducerArgs) => {
  switch (type) {
    case types.SET_DEVICE:
      return {
        ...state,
        device: payload
      }
    default:
      return state
  }
}

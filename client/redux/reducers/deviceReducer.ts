import * as types from '../types'
import { DEVICE_DESKTOP } from '../../../common/devices'

interface deviceReducerArgs {
  type: string
  payload?: any
}

const initialDeviceState = {
  device: DEVICE_DESKTOP
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

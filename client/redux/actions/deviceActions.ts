import { Dispatch } from 'redux'
import * as types from '../types'
import { DEVICE_DESKTOP, DEVICE_MOBILE } from '../../../common/devices'

export const setDevice = (deviceWidth: number) => (dispatch: Dispatch) => {
  dispatch({
    type: types.SET_DEVICE,
    payload: deviceWidth <= 450 ? DEVICE_MOBILE : DEVICE_DESKTOP
  })
}

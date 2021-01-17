import { Dispatch } from 'redux'
import * as types from '../types'

export const setDevice = (deviceWidth: number) => (dispatch: Dispatch) => {
  dispatch({
    type: types.SET_DEVICE,
    payload: deviceWidth <= 450 ? 'mobile' : 'desktop'
  })
}

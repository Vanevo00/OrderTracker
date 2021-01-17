import * as types from '../types'
import { Dispatch } from 'redux'
import { gql } from '@apollo/client'
import { apolloClient } from '../../apollo/apollo'

const CHECK_USER_TOKEN = gql`
  query {
    checkUserToken {
        _id
        name
        email
    }
  }
`

const LOGOUT_USER = gql`
  mutation {
    logout
  }
`

export const setUser = () => async (dispatch: Dispatch) => {
  try {
    const {
      data: {
        checkUserToken
      }
    } = await apolloClient.query({
      query: CHECK_USER_TOKEN
    })

    dispatch({
      type: types.SET_USER,
      payload: {
        ...checkUserToken
      }
    })
  } catch {
    dispatch({
      type: types.USER_NOT_FOUND
    })
  }
}

export const logoutUser = () => async (dispatch: Dispatch) => {
  await apolloClient.mutate({
    mutation: LOGOUT_USER
  })

  dispatch({ type: types.LOGOUT_USER })
}

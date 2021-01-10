import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/userActions'
import { setDevice } from '../../redux/deviceActions'

const useGetInitialStateValues = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const setInitialStateValues = async () => {
      await Promise.all([
        dispatch(setUser()),
        dispatch(setDevice(window.innerWidth))
      ])
    }

    setInitialStateValues()
  }, [])
}

export default useGetInitialStateValues

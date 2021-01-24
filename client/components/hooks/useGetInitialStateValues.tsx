import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/actions/userActions'
import { setDevice } from '../../redux/actions/deviceActions'
import { setOrders } from '../../redux/actions/orderActions'
import { setSuppliers } from '../../redux/actions/supplierActions'

const useGetInitialStateValues = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const setInitialStateValues = async () => {
      await Promise.all([
        dispatch(setUser()),
        dispatch(setDevice(window.innerWidth)),
        dispatch(setOrders()),
        dispatch(setSuppliers())
      ])
    }

    setInitialStateValues()
  }, [])
}

export default useGetInitialStateValues

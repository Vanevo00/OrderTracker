import React, { useEffect } from 'react'
import OrderItem from './OrderItem'
import { RootStateOrAny, useSelector } from 'react-redux'

const OrderItems = () => {
  const { user } = useSelector((state: RootStateOrAny) => state.userState)

  useEffect(() => {

  }, [])

  return (
    <>
      <OrderItem title='test1'/>
      <OrderItem title='test2'/>
    </>
  )
}

export default OrderItems

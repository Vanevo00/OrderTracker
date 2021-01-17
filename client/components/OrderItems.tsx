import React from 'react'
import OrderItem from './OrderItem'
import { RootStateOrAny, useSelector } from 'react-redux'
import { IOrderPopulated } from '../../types/Order'

const OrderItems = () => {
  const {
    orders
  } = useSelector((state: RootStateOrAny) => state.orderState)

  return (
    <>
      {
        orders.map((order: IOrderPopulated) => <OrderItem order={order} key={order._id} />)
      }
    </>
  )
}

export default OrderItems

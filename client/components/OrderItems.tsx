import React from 'react'
import OrderItem from './OrderItem'
import { RootStateOrAny, useSelector } from 'react-redux'
import { IOrder } from '../../types/Order'

const OrderItems = () => {
  const {
    orders
  } = useSelector((state: RootStateOrAny) => state.orderState)

  return (
    <>
      {
        orders.map((order: IOrder) => <OrderItem title={order.client}/>)
      }
    </>
  )
}

export default OrderItems

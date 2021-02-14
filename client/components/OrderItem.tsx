import React from 'react'
import { IOrderPopulated } from '../../types/Order'
import getShortDate from '../utils/getShortDate'
import { setActiveOrder } from '../redux/actions/orderActions'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'

interface Props {
  order: IOrderPopulated
}

const OrderItem = ({ order }: Props) => {
  const dispatch = useDispatch()
  const {
    activeOrder
  } = useSelector((state: RootStateOrAny) => state.orderState)
  const isActive = activeOrder && order._id === activeOrder._id

  const {
    client,
    created,
    name
  } = order

  const supplierName = order.supplier?.name ? order.supplier?.name : ''

  const onClick = () => {
    dispatch(setActiveOrder(order))
  }

  return (
    <div className={`order-item pointer ${isActive && 'white-background'}`} onClick={onClick}>
      <p><strong>{name}</strong></p>
      <p>dodavatel: {supplierName}</p>
      <p>klient: {client}</p>
      <p>{created && getShortDate(created)}</p>
    </div>
  )
}

export default OrderItem

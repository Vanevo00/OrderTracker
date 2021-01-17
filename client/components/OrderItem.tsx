import React from 'react'
import { IOrderPopulated } from '../../types/Order'
import getShortDate from '../utils/getShortDate'

interface Props {
  order: IOrderPopulated
}

const OrderItem = ({ order }: Props) => {
  const {
    client,
    created,
    supplier: {
      name: supplierName
    },
    name
  } = order

  return (
    <div className='order-item pointer'>
      <p><strong>{name}</strong></p>
      <p>dodavatel: {supplierName}</p>
      <p>klient: {client}</p>
      <p>{created && getShortDate(created)}</p>
    </div>
  )
}

export default OrderItem

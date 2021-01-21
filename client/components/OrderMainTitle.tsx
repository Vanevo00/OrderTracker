import React from 'react'
import { IOrderPopulated } from '../../types/Order'
import getShortDate from '../utils/getShortDate'

interface Props {
  order: IOrderPopulated
}

const OrderMainTitle = ({ order }: Props) => {
  const generateMainTitle = (order: IOrderPopulated) => {
    const created = order.created ? `${getShortDate(order.created)}/` : ''
    const supplier = order.supplier.abbreviation ? `${order.supplier.abbreviation}/` : `${order.supplier.name}/`
    const orderName = `${order.name}/`
    const clientName = order.client

    return created + supplier + orderName + clientName
  }

  return (
    <h3><strong>{generateMainTitle(order)}</strong></h3>
  )
}

export default OrderMainTitle

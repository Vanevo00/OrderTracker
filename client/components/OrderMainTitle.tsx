import React from 'react'
import { IOrderPopulated } from '../../types/Order'
import formatDate from '../utils/formatDate'
import { RootStateOrAny, useSelector } from 'react-redux'

const OrderMainTitle = () => {
  const {
    activeOrder,
    orderSaveStatus
  } = useSelector((state: RootStateOrAny) => state.orderState)

  const generateMainTitle = (order: IOrderPopulated) => {
    const created = order.created ? `${formatDate(order.created)}/` : ''
    const supplier = order.supplier ? order.supplier.abbreviation ? `${order.supplier.abbreviation}/` : `${order.supplier.name}/` : ''
    const orderName = `${order.name}/`
    const clientName = order.client

    return created + supplier + orderName + clientName
  }

  return (
    <div>
      <h3 className='m-0 small-line-height'><strong>{generateMainTitle(activeOrder)}</strong></h3>
      <p className='gray-font'><small>{orderSaveStatus ? orderSaveStatus : `poslední aktualizace: ${formatDate(activeOrder.updated, true)}`}</small></p>
    </div>
  )
}

export default OrderMainTitle

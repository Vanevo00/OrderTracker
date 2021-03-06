import React from 'react'
import { IOrderPopulated } from '../../types/Order'
import formatDate from '../utils/formatDate'
import { RootStateOrAny, useSelector } from 'react-redux'

const OrderMainTitle = () => {
  const {
    activeOrder,
    orderSaveStatus
  } = useSelector((state: RootStateOrAny) => state.orderState)

  const generateMainTitle = (order: IOrderPopulated): string => {
    if (!order.name) return '[ bez názvu ]'

    const detailsArray: string[] = []

    const pushIfAvailable = (checkedValue: string | undefined, pushedValue?: string | undefined) => {
      if (checkedValue) {
        detailsArray.push(pushedValue || checkedValue)
      }
    }

    pushIfAvailable(order.created, `${formatDate(order.created)}`)
    pushIfAvailable(order.supplier?.name, order.supplier?.abbreviation ? order.supplier?.abbreviation : order.supplier?.name)
    pushIfAvailable(order.name)
    pushIfAvailable(order.client)

    return detailsArray.join('/')
  }

  return (
    <div>
      <h3 className='m-0 small-line-height'><strong>{generateMainTitle(activeOrder)}</strong></h3>
      <p className='gray-font'><small>{orderSaveStatus ? orderSaveStatus : `poslední aktualizace: ${formatDate(activeOrder.updated, true)}`}</small></p>
    </div>
  )
}

export default OrderMainTitle

import React from 'react'
import { IOrderPopulated } from '../../types/Order'
import formatDate from '../utils/formatDate'
import { RootStateOrAny, useSelector } from 'react-redux'
import { DEVICE_MOBILE } from '../../common/devices'

const OrderMainTitle = () => {
  const {
    orderState: {
      activeOrder,
      orderSaveStatus
    },
    deviceState: {
      device
    }
  } = useSelector((state: RootStateOrAny) => state)

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
      {
        device === DEVICE_MOBILE
          ? <h5 className='m-0 small-line-height'><strong>{generateMainTitle(activeOrder)}</strong></h5>
          : <h3 className='m-0 small-line-height'><strong>{generateMainTitle(activeOrder)}</strong></h3>
      }
      <p className='gray-font'><small>{orderSaveStatus ? orderSaveStatus : `poslední aktualizace: ${formatDate(activeOrder.updated, true)}`}</small></p>
    </div>
  )
}

export default OrderMainTitle

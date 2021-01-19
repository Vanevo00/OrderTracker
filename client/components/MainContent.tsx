import { RootStateOrAny, useSelector } from 'react-redux'
import React from 'react'

const MainContent = () => {
  const {
    loadingOrders,
    activeOrder,
    orders
  } = useSelector((state: RootStateOrAny) => state.orderState)

  if (loadingOrders) {
    return null
  }

  if (activeOrder) {
    return (
      <p>
        {activeOrder.name}
      </p>
    )
  }

  return (
    <p>
      {orders[0].name}
    </p>
  )
}

export default MainContent

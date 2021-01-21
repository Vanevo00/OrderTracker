import { RootStateOrAny, useSelector } from 'react-redux'
import React from 'react'
import OrderMainTitle from './OrderMainTitle'

const MainContent = () => {
  const {
    loadingOrders,
    activeOrder,
    orders
  } = useSelector((state: RootStateOrAny) => state.orderState)

  if (loadingOrders) {
    return null
  }

  return (
    <>
      <OrderMainTitle order={activeOrder || orders[0]}/>
    </>
  )
}

export default MainContent

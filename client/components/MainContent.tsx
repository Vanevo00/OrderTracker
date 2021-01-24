import { RootStateOrAny, useSelector } from 'react-redux'
import React from 'react'
import OrderMainTitle from './OrderMainTitle'
import OrderForm from './OrderForm'

const MainContent = () => {
  const {
    loadingOrders
  } = useSelector((state: RootStateOrAny) => state.orderState)

  if (loadingOrders) {
    return null
  }

  return (
    <>
      <OrderMainTitle/>
      <OrderForm/>
    </>
  )
}

export default MainContent

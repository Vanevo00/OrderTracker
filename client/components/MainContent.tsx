import { RootStateOrAny, useSelector } from 'react-redux'
import React from 'react'
import OrderMainTitle from './OrderMainTitle'
import OrderForm from './OrderForm'
import BackButton from './BackButton'
import { DEVICE_MOBILE } from '../../common/devices'

const MainContent = () => {
  const {
    orderState: {
      loadingOrders
    },
    deviceState: {
      device
    }
  } = useSelector((state: RootStateOrAny) => state)

  if (loadingOrders) {
    return null
  }

  return (
    <>
      {device === DEVICE_MOBILE && <BackButton/>}
      <OrderMainTitle/>
      <OrderForm/>
    </>
  )
}

export default MainContent

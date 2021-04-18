import React from 'react'
import { Col } from 'react-bootstrap'
import OrderItems from './OrderItems'
import { RootStateOrAny, useSelector } from 'react-redux'
import Loader from './Loader'
import OrdersFilters from './OrdersFilters'

const OrderList = () => {
  const {
    loadingOrders
  } = useSelector((state: RootStateOrAny) => state.orderState)

  return (
    <Col xl={3} md={4} sm={5} xs={12} className='light-background height-remainder order-list p-0' id='orderList'>
      <OrdersFilters/>
      {
        loadingOrders
          ? <Loader/>
          : <OrderItems/>
      }
    </Col>
  )
}

export default OrderList

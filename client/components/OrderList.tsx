import React from 'react'
import { Col } from 'react-bootstrap'
import OrderItems from './OrderItems'

const OrderList = () => {
  return (
    <Col xl={3} md={4} sm={5} xs={12} className='light-background height-remainder order-list p-0'>
      <OrderItems/>
    </Col>
  )
}

export default OrderList

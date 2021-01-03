import React from 'react'
import { Container, ListGroup, Row } from 'react-bootstrap'
import OrderItem from './OrderItem'

const OrderList = () => {
  return (
    <Container>
      <Row>
        <OrderItem active={false} title='1'/>
        <OrderItem active={true} title='2'/>
        <OrderItem active={false} title='3'/>
      </Row>
    </Container>

  )
}

export default OrderList

import React from 'react'
import { Card, Col } from 'react-bootstrap'

interface Props {
  active: boolean
  title: string
}

const OrderItem = ({ title }: Props) => (
  <Col lg={4} md={6} sm={12}>
    <Card className='mb-4'>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aperiam asperiores assumenda at cum distinctio eum excepturi ipsum iusto laborum maxime modi neque odit quasi repudiandae tenetur, ut velit voluptas!</Card.Text>
      </Card.Body>
    </Card>
  </Col>
)

export default OrderItem

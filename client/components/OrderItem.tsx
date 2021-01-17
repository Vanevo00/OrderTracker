import React from 'react'

interface Props {
  title: string
}

const OrderItem = ({ title }: Props) => (
  <div>{title}</div>
)

export default OrderItem

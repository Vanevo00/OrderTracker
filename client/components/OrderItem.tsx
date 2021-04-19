import React from 'react'
import { IOrderPopulated } from '../../types/Order'
import formatDate from '../utils/formatDate'
import { setActiveOrder } from '../redux/actions/orderActions'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import scrollToFormIfMobile from '../utils/scrollToFormIfMobile'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from '@fortawesome/free-solid-svg-icons'

interface Props {
  order: IOrderPopulated
}

const OrderItem = ({ order }: Props) => {
  const dispatch = useDispatch()
  const {
    orderState: {
      activeOrder
    },
    deviceState: {
      device
    }
  } = useSelector((state: RootStateOrAny) => state)
  const isActive = activeOrder && order._id === activeOrder._id

  const {
    client,
    created,
    name
  } = order

  const supplierName = order.supplier?.name ? order.supplier?.name : ''

  const onClick = () => {
    dispatch(setActiveOrder(order))
    scrollToFormIfMobile(device)
  }

  return (
    <div className={`order-item pointer ${isActive && 'white-background'}`} onClick={onClick}>
      <div className='d-flex w-100'>
        <div className='w-75'>
          <p><strong>{name ? name : '[ bez názvu ]'}</strong></p>
          <p>dodavatel: {supplierName}</p>
          <p>klient: {client}</p>
          <p>{created && formatDate(created)}</p>
        </div>
        <div className='d-flex w-25 justify-content-center align-items-center'>
          <Button variant='success' size='sm'><FontAwesomeIcon icon={faArchive}/></Button>
        </div>
      </div>
    </div>
  )
}

export default OrderItem

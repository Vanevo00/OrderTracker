import React, { ChangeEvent, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { saveUpdatedOrder, updateActiveOrder } from '../redux/actions/orderActions'
import OrderFormInput from './OrderFormInput'

const OrderForm = () => {
  const dispatch = useDispatch()
  const {
    activeOrder,
    userStartedTyping
  } = useSelector((state: RootStateOrAny) => state.orderState)

  const {
    name,
    client,
    phone,
    email
  } = activeOrder

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedOrder = {
      ...activeOrder,
      [e.target.name]: e.target.value
    }

    dispatch(updateActiveOrder(updatedOrder))
  }

  useEffect(() => {
    if (userStartedTyping) {
      const timeoutId = setTimeout(() => {
        dispatch(saveUpdatedOrder(activeOrder))
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [activeOrder])

  console.log('phone', phone)

  return (
    <Form className='mt-3'>
      <OrderFormInput
        label='název objednávky'
        type='text'
        name='name'
        value={name || ''}
        onChange={onChange}
      />
      <OrderFormInput
        label='klient'
        type='text'
        name='client'
        value={client || ''}
        onChange={onChange}
      />
      <OrderFormInput
        label='telefon'
        type='tel'
        name='phone'
        value={phone || ''}
        onChange={onChange}
      />
      <OrderFormInput
        label='e-mail'
        type='email'
        name='email'
        value={email || ''}
        onChange={onChange}
      />
    </Form>
  )
}

export default OrderForm

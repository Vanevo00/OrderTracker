import React, { ChangeEvent, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { saveUpdatedOrder, updateActiveOrder } from '../redux/actions/orderActions'

const OrderForm = () => {
  const dispatch = useDispatch()
  const {
    activeOrder,
    userStartedTyping,
    orderSaveStatus
  } = useSelector((state: RootStateOrAny) => state.orderState)

  const {
    name
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

  return (
    <Form className='mt-3'>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Jméno objednávky</Form.Label>
        <Form.Control type='text' placeholder='např. diamantový prsten' name='name' value={name} onChange={onChange}/>
      </Form.Group>
    </Form>
  )
}

export default OrderForm

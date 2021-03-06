import React, { ChangeEvent, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { saveUpdatedOrder, updateActiveOrder } from '../redux/actions/orderActions'
import OrderFormInput from './OrderFormInput'
import OrderFormSelect from './OrderFormSelect'
import { ISupplier } from '../../types/Supplier'
import AddSupplierModal from './AddSupplierModal'
import { showSupplierModal } from '../redux/actions/supplierActions'
import OrderFormTextarea from './OrderFormTextarea'

const OrderForm = () => {
  const dispatch = useDispatch()
  const {
    orderState: {
      activeOrder,
      userStartedTyping,
      orderErrors
    },
    supplierState: {
      suppliers
    }
  } = useSelector((state: RootStateOrAny) => state)

  const {
    name,
    client,
    phone,
    email,
    supplier,
    product,
    orderedOn,
    created,
    toBeReadyOn,
    smsSent,
    notes,
    isNew
  } = activeOrder

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedOrder = {
      ...activeOrder,
      [e.target.name]: e.target.value
    }

    dispatch(updateActiveOrder(updatedOrder))
  }

  const onSupplierChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'addSupplier') {
      dispatch(showSupplierModal)
      return
    }

    const selectedSupplier = suppliers.filter((supplier: ISupplier) => supplier._id === e.target.value)[0]

    const updatedOrder = {
      ...activeOrder,
      supplier: selectedSupplier
    }

    dispatch(updateActiveOrder(updatedOrder))
  }

  useEffect(() => {
    if (userStartedTyping && !isNew) {
      const timeoutId = setTimeout(() => {
        dispatch(saveUpdatedOrder(activeOrder))
      }, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [activeOrder])

  return (
    <>
      <Form className='mt-3'>
        <OrderFormInput
          label='název objednávky'
          type='text'
          name='name'
          value={name || ''}
          onChange={onChange}
          error={orderErrors.name}
        />
        <OrderFormInput
          label='klient'
          type='text'
          name='client'
          value={client || ''}
          onChange={onChange}
          error={orderErrors.client}
        />
        <OrderFormInput
          label='objednáno klientem'
          type='date'
          name='created'
          value={created || ''}
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
          error={orderErrors.email}
        />
        <OrderFormSelect
          label='dodavatel'
          name='supplier'
          options={suppliers}
          extraOptions={[{
            name: 'přidat nového dodavatele',
            value: 'addSupplier'
          }]}
          value={supplier?._id || undefined}
          onChange={onSupplierChange}
        />
        <OrderFormInput
          label='produkt'
          type='text'
          name='product'
          value={product || ''}
          onChange={onChange}
          error={orderErrors.product}
        />
        <OrderFormInput
          label='objednáno u dodavatele'
          type='text'
          name='orderedOn'
          value={orderedOn || ''}
          onChange={onChange}
          error={orderErrors.orderedOn}
        />
        <OrderFormInput
          label='termín vydání'
          type='text'
          name='toBeReadyOn'
          value={toBeReadyOn || ''}
          onChange={onChange}
          error={orderErrors.toBeReadyOn}
        />
        <OrderFormInput
          label='sms k vyzvednutí'
          type='text'
          name='smsSent'
          value={smsSent || ''}
          onChange={onChange}
          error={orderErrors.smsSent}
        />
        <OrderFormTextarea
          label='poznámky'
          name='notes'
          value={notes || ''}
          onChange={onChange}
          error={orderErrors.notes}
        />
      </Form>
      <AddSupplierModal/>
    </>
  )
}

export default OrderForm

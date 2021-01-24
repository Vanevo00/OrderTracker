import React, { ChangeEvent } from 'react'

interface Props {
  label: string
  type: string
  name: string
  value: any
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const OrderFormInput = ({ label, type, name, value, onChange }: Props) => {
  return (
    <div className='d-flex'>
      <label className='order-form-label' htmlFor={name}><strong>{label}:</strong></label>
      <div className='flex-grow-1'>
        <input
          className='order-form-input ml-1 w-100'
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  )
}

export default OrderFormInput

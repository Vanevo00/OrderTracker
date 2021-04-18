import React, { ChangeEvent } from 'react'

interface Props {
  label: string
  type: string
  name: string
  value: any
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const OrderFormInput = ({ label, type, name, value, onChange, error }: Props) => {
  const convertedValue = type === 'date' ? value.slice(0, 10) : value

  return (
    <div className='d-flex position-relative mb-1'>
      <label className='order-form-label text-nowrap' htmlFor={name}><strong>{label}:</strong></label>
      <div className='flex-grow-1'>
        <input
          className={`order-form-input ml-1 ${type === 'date' ? 'w-auto' : 'w-100'}`}
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          value={convertedValue}
        />
      </div>
      <small className='position-absolute text-danger bottom-negative-4'>{error}</small>
    </div>
  )
}

export default OrderFormInput

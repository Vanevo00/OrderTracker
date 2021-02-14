import React, { ChangeEvent } from 'react'

interface Props {
  label: string
  name: string
  value: any
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  error?: string
}

const OrderFormTextarea = ({ label, name, value, onChange, error }: Props) => {
  return (
    <div className='d-flex position-relative mb-1 flex-lg-wrap'>
      <div className='flex-grow-1'>
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className='order-form-textarea'
          placeholder={label}
        />
      </div>
      <small className='position-absolute text-danger bottom-negative-10'>{error}</small>
    </div>
  )
}

export default OrderFormTextarea

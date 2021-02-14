import React, { ChangeEvent } from 'react'

interface Props {
  label: string
  name: string
  options: any[]
  extraOptions: [{
    name: string
    value: string
  }]
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const OrderFormSelect = ({ label, name, options, extraOptions, value, onChange }: Props) => {
  return (
    <div className='d-flex'>
      <label className='order-form-label' htmlFor={name}><strong>{label}:</strong></label>
      <div className='flex-grow-1'>
        <select value={value} onChange={onChange} name={name} id={name} className='ml-1 order-form-input white-background'>
          {options.map((option) => <option key={option._id} value={option._id}>{option.name}</option>)}
          {extraOptions.map((option) => <option key={option.value} value={option.value}>{option.name}</option>)}
        </select>
      </div>
    </div>
  )
}

export default OrderFormSelect

import React, { ChangeEvent, useState } from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { filterOrders } from '../redux/actions/orderActions'

const radios = [
  { name: 'Aktivní', value: 'active' },
  { name: 'Archiv', value: 'archived' },
  { name: 'Vše', value: 'all' }
]

const OrdersFilters = () => {
  const dispatch = useDispatch()
  const [radioValue, setRadioValue] = useState< string | undefined >('active')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.currentTarget.value)
    dispatch(filterOrders(e.currentTarget.value))
  }

  return (
    <div className='d-flex justify-content-center p-2'>
      <ButtonGroup toggle>
        {radios.map((radio, index) => (
          <ToggleButton
            key={index}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={onChange}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  )
}

export default OrdersFilters

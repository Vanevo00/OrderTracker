import React from 'react'
import { useDispatch } from 'react-redux'
import { removeActiveOrder } from '../redux/actions/orderActions'

const BackButton = () => {
  const dispatch = useDispatch()

  const onClick = () => {
    dispatch(removeActiveOrder())

    const orderList = document.getElementById('orderList')
    orderList && orderList.scrollIntoView()
  }

  return <button className='back-button' onClick={onClick}><strong>&laquo; zpět</strong></button>
}

export default BackButton

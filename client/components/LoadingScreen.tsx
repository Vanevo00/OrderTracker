import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingScreen = () => {
  return (
    <div className='center-content'>
      <Spinner animation='border' variant='light' />
    </div>
  )
}

export default LoadingScreen

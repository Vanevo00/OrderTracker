import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='center-content full-width-height'>
      <Spinner animation='border' variant='dark'/>
    </div>
  )
}

export default Loader

import React, { FunctionComponent } from 'react'
import Navbar from './Navbar'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navbar/>
      { children }
    </>
  )
}

export default Layout

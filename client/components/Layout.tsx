import React, { FunctionComponent } from 'react'
import MainMenu from './MainMenu'
import { Container } from 'react-bootstrap'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <Container fluid className='p-0'>
      <MainMenu/>
      <div className='offset-navbar'>
        { children }
      </div>

    </Container>
  )
}

export default Layout

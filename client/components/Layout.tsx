import React, { FunctionComponent } from 'react'
import MainMenu from './MainMenu'
import { Container } from 'react-bootstrap'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <Container fluid>
      <MainMenu/>
      { children }
    </Container>
  )
}

export default Layout

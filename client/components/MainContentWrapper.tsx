import React from 'react'
import { Col } from 'react-bootstrap'
import MainContent from './MainContent'

const MainContentWrapper = () => (
  <Col xl={9} md={8} sm={7} className='d-none d-sm-block white-background height-remainder p-5'>
    <MainContent/>
  </Col>
)

export default MainContentWrapper

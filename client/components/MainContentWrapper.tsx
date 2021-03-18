import React from 'react'
import { Col } from 'react-bootstrap'
import MainContent from './MainContent'

const MainContentWrapper = () => (
  <Col xl={9} md={8} sm={7} xs={12} className='d-sm-block white-background min-height-remainder p-sm-5 p-3 pt-5 position-relative overflow-scroll' id='main'>
    <MainContent/>
  </Col>
)

export default MainContentWrapper

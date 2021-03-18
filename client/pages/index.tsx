import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Loader from '../components/Loader'
import Layout from '../components/Layout'
import useGetInitialStateValues from '../components/hooks/useGetInitialStateValues'
import OrderList from '../components/OrderList'
import { Row } from 'react-bootstrap'
import MainContentWrapper from '../components/MainContentWrapper'
import { DEVICE_MOBILE } from '../../common/devices'

const Home = () => {
  useGetInitialStateValues()
  const router = useRouter()
  const {
    userState: {
      loadingFinished,
      user
    },
    deviceState: {
      device
    }
  } = useSelector((state: RootStateOrAny) => state)

  if (!loadingFinished) {
    return (
      <div className='full-screen'>
        <Loader/>
      </div>
    )
  }

  if (loadingFinished && !user._id) {
    router.push('/login')
    return (
      <div className='full-screen'>
        <Loader/>
      </div>
    )
  }

  if (device === DEVICE_MOBILE) {
    return (
      <Layout>
        <div className='mobile-wrapper mobile-fixed-height'>
          <OrderList/>
          <MainContentWrapper/>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Row className='m-0'>
        <OrderList/>
        <MainContentWrapper/>
      </Row>
    </Layout>
  )
}

export default Home

import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Loader from '../components/Loader'
import Layout from '../components/Layout'
import useGetInitialStateValues from '../components/hooks/useGetInitialStateValues'
import OrderList from '../components/OrderList'
import { Row } from 'react-bootstrap'
import MainContentWrapper from '../components/MainContentWrapper'

const Home = () => {
  useGetInitialStateValues()
  const router = useRouter()
  const {
    loadingFinished,
    user
  } = useSelector((state: RootStateOrAny) => state.userState)

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

import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import LoadingScreen from '../components/LoadingScreen'
import Layout from '../components/Layout'
import useGetInitialStateValues from '../components/hooks/useGetInitialStateValues'
import OrderList from '../components/OrderList'
import { Row } from 'react-bootstrap'

const Home = () => {
  useGetInitialStateValues()
  const router = useRouter()
  const {
    loadingFinished,
    user
  } = useSelector((state: RootStateOrAny) => state.userState)

  if (!loadingFinished) return <LoadingScreen/>

  if (loadingFinished && !user._id) {
    router.push('/login')
    return <LoadingScreen/>
  }

  return (
    <Layout>
      <OrderList/>
    </Layout>
  )
}

export default Home

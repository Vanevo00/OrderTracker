import React from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import LoadingScreen from '../components/LoadingScreen'
import Layout from '../components/Layout'
import useGetInitialStateValues from '../components/hooks/useGetInitialStateValues'

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
      pes
    </Layout>
  )
}

export default Home

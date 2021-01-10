import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/actions'
import { useRouter } from 'next/router'
import LoadingScreen from '../components/LoadingScreen'
import Layout from '../components/Layout'

const Home = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {
    loadingFinished,
    user
  } = useSelector((state: RootStateOrAny) => state.userState)

  useEffect(() => {
    dispatch(setUser())
  }, [])

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

import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { logoutUser, setUser } from '../redux/actions'
import Link from 'next/link'
import { useRouter } from 'next/router'

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

  if (loadingFinished && !user._id) {
    router.push('/login')
  }

  return (
    <>
      <Button variant="success" onClick={() => dispatch(setUser())}>set user</Button>
      <Button variant="danger" onClick={() => {
        dispatch(logoutUser())
        location.reload()
      }}>unset user</Button>
      <Link href='/login'><a>Login</a></Link>
    </>
  )
}

export default Home

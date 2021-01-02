import React from 'react'
import { Button } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { logoutUser, setUser } from '../redux/actions'

const Home = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootStateOrAny) => state.userState)

  return (
    <>
      <Button variant="success" onClick={() => dispatch(setUser())}>set user</Button>
      <Button variant="danger" onClick={() => dispatch(logoutUser())}>unset user</Button>
    </>
  )
}

export default Home

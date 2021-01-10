import React from 'react'
import { Row } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions'
import { useRouter } from 'next/router'

const MainMenu = () => {
  const dispatch = useDispatch()
  const {
    user
  } = useSelector((state: RootStateOrAny) => state.userState)
  const router = useRouter()

  const onLogout = async () => {
    await dispatch(logoutUser())
    router.reload()
  }

  return (
    <Row>
      <div className='main-menu min-100-vh dark-background'>pes</div>
    </Row>
  )
}

export default MainMenu

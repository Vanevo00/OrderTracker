import React from 'react'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'
import { useRouter } from 'next/router'
import { startNewOrder } from '../redux/actions/orderActions'
import { DEVICE_DESKTOP, DEVICE_MOBILE } from '../../common/devices'

const MainMenu = () => {
  const dispatch = useDispatch()
  const {
    userState: {
      user
    },
    deviceState: {
      device
    }
  } = useSelector((state: RootStateOrAny) => state)
  const router = useRouter()

  const onLogout = async () => {
    await dispatch(logoutUser())
    router.reload()
  }

  const onStartNewOrder = async () => {
    await dispatch(startNewOrder())
  }

  return (
    <Navbar fixed='top' bg='dark' variant='dark' className={`${device === DEVICE_MOBILE && 'justify-content-between'}`}>
      <Nav>
        <NavDropdown title={user.email} id='user-dropdown'>
          <NavDropdown.Item onClick={onLogout}>Odhlásit se</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Button size="sm" variant="success" className={`rounded-pill ${device === DEVICE_DESKTOP && 'ml-5'}`} onClick={onStartNewOrder}><strong>+</strong> Nová zakázka</Button>
    </Navbar>
  )
}

export default MainMenu

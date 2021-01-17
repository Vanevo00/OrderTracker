import React from 'react'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions/userActions'
import { useRouter } from 'next/router'

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

  return (
    <Navbar bg='dark' variant='dark' className={`${device === 'mobile' && 'justify-content-between'}`}>
      <Nav>
        <NavDropdown title={user.email} id='user-dropdown'>
          <NavDropdown.Item onClick={onLogout}>Odhlásit se</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Button size="sm" variant="success" className={`rounded-pill ${device === 'desktop' && 'ml-5'}`}><strong>+</strong> Nová zakázka</Button>
    </Navbar>
  )
}

export default MainMenu

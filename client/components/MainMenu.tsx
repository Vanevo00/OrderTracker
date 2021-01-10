import React from 'react'
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap'
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
    <Navbar bg='dark' variant='dark'>
      <Nav>
        <NavDropdown title={user.email} id='user-dropdown'>
          <NavDropdown.Item onClick={onLogout}>Odhlásit se</NavDropdown.Item>
        </NavDropdown>
        <Button size="sm" variant="success" className='ml-5 rounded-pill'>+ Nová zakázka</Button>
      </Nav>

    </Navbar>
  )
}

export default MainMenu

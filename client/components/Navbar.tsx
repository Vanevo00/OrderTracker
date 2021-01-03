import React from 'react'
import { Nav, Navbar as BootstrapNavbar, NavDropdown } from 'react-bootstrap'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/actions'
import { useRouter } from 'next/router'

const Navbar = () => {
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
    <BootstrapNavbar bg='dark' variant='dark' expand='sm' className='pr-sm-5'>
      <BootstrapNavbar.Brand href='#home'>Správce zakázek</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls='basic-navbar-nav' />
      <BootstrapNavbar.Collapse id='basic-navbar-nav' className='justify-content-end mr-sm-5'>
        <Nav>
          <NavDropdown title={user.name} id='user-dropdown'>
            <NavDropdown.Item onClick={onLogout}>Odhlásit se</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  )
}

export default Navbar

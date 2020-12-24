import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { apolloClient } from '../../apollo/apollo'
import { gql } from '@apollo/client'
import Link from 'next/link'

const LOGIN_BY_PASSWORD = gql`
  mutation(
    $email: String!
    $password: String!
  ) {
    loginByPassword (
      email: $email
      password: $password
    ) {
      _id
      name
    }
  }
`

const Login = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      const {
        email,
        password
      } = inputValues

      e.preventDefault()
      await apolloClient.mutate({
        mutation: LOGIN_BY_PASSWORD,
        variables: {
          email,
          password
        }
      })
    } catch (err) {
      switch (err.message) {
        case 'Error: invalid password':
          setErrorMessage('nesprávné heslo')
          break
        case 'Error: user not found':
          setErrorMessage('uživatel s tímto emailem nenalezen')
          break
        default:
          setErrorMessage(err.message)
      }
    }
  }

  return (
      <div className='center-content'>
        <Form className='white-form p-4 rounded shadow' onSubmit={onSubmit} >
          <h1 className="h3 mb-3 fw-normal">Přihlášení</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' name='email' placeholder='email' value={inputValues.email} onChange={onChange} required/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Heslo</Form.Label>
            <Form.Control type="password" name='password' placeholder="heslo" value={inputValues.password} onChange={onChange} required/>
          </Form.Group>
          {errorMessage && <Alert variant='danger' className='p-2'>{errorMessage}</Alert>}
          <Button variant="primary" type="submit" block>
            Přihlásit se
          </Button>
          <Link href='/registrace'>
            <div className='mt-3 text-primary pointer'>
              <a>Založit nový účet</a>
            </div>
          </Link>
        </Form>
      </div>
  )
}

export default Login

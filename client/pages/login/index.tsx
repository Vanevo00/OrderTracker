import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Alert, Button, Form, Spinner } from 'react-bootstrap'
import { apolloClient } from '../../apollo/apollo'
import { gql } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('')
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        email,
        password
      } = inputValues

      await apolloClient.mutate({
        mutation: LOGIN_BY_PASSWORD,
        variables: {
          email,
          password
        }
      })

      router.push('/')
    } catch (err) {
      switch (err.message) {
        case 'Error: invalid password':
          setErrorMessage('nesprávné heslo')
          break
        case 'Error: user not found':
          setErrorMessage('uživatel s tímto emailem nenalezen')
          break
        case 'Error: user not activated':
          setErrorMessage('uživatel ještě nebyl aktivován, zkontrolujte svoji emailovou schránku')
          break
        default:
          setErrorMessage(err.message)
      }
    }
    setLoading(false)
  }

  return (
      <div className='center-content'>
        <Form className='white-form p-4 shadow responsive-form' onSubmit={onSubmit} >
          <h1 className="h3 mb-3 fw-normal">Přihlášení</h1>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' name='email' placeholder='email' value={inputValues.email} onChange={onChange} required/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Heslo</Form.Label>
            <Form.Control type="password" name='password' placeholder="heslo" value={inputValues.password} onChange={onChange} required/>
          </Form.Group>
          {errorMessage && <Alert variant='danger' className='p-2'>{errorMessage}</Alert>}
          <Button variant="primary" type="submit" block>
            {
              loading
                ? <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                  />
                : 'Přihlásit se'
            }
          </Button>
          <Link href='/registrace'>
            <div className='mt-3 text-primary pointer'>
              <a>Registrace nového účtu</a>
            </div>
          </Link>
        </Form>
      </div>
  )
}

export default Login

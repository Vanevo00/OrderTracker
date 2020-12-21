import React, { FormEvent } from 'react'
import { Button, Form } from 'react-bootstrap'

const Login = () => {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit')
  }

  return (
      <div className='center-content'>
        <Form className='white-form p-4 rounded shadow' onSubmit={onSubmit}>
          <h1 className="h3 mb-3 fw-normal">Přihlášení</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' name='email' placeholder='email'/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Heslo</Form.Label>
            <Form.Control type="password" name='email' placeholder="heslo"/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Přihlásit se
          </Button>
        </Form>
      </div>
  )
}

export default Login

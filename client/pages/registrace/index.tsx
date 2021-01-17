import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Alert, Button, Form, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap'
import { apolloClient } from '../../apollo/apollo'
import { gql } from '@apollo/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/actions/userActions'

const REGISTER_USER = gql`
    mutation(
        $name: String!
        $email: String!
        $password: String!
    ) {
        registerUser (
            name: $name
            email: $email
            password: $password
        ) {
            _id
            name
        }
    }
`

const Register = () => {
  const [inputValues, setInputValues] = useState({
    email: '',
    name: '',
    password: '',
    password2: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [complete, setComplete] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()
  const {
    loadingFinished,
    user
  } = useSelector((state: RootStateOrAny) => state.userState)

  useEffect(() => {
    dispatch(setUser())
  }, [])

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
        password,
        password2
      } = inputValues

      if (password !== password2) {
        setLoading(false)
        return setErrorMessage('hesla se neshodují')
      }

      const name = inputValues.name || email.split('@')[0]

      await apolloClient.mutate({
        mutation: REGISTER_USER,
        variables: {
          name,
          email,
          password
        }
      })
      setComplete(true)
    } catch (err) {
      switch (err.message) {
        case 'Error: Invalid password format':
          setErrorMessage('heslo musí obsahovat alespoň jedno velké písmeno, jedno malé písmeno, jedno číslo a musí být alespoň 7 znaků dlouhé')
          break
        case 'Error: Invalid email':
          setErrorMessage('nesprávný formát emailu')
          break
        case 'Error: Duplicate user key: name':
          setErrorMessage('uvedené uživatelské jméno používá již jiný uživatel')
          break
        case 'Error: Duplicate user key: email':
          setErrorMessage('uživatel s tímto emailem již existuje')
          break
        default:
          setErrorMessage(err.message)
      }
    }
    setLoading(false)
  }

  if (complete) {
    return (
      <div className='main-background full-screen center-content text-white text-center'>
        Registrace proběhla úspěšně. Na Váš email byla zaslána zpráva s aktivačním kódem.
      </div>
    )
  }

  if (loadingFinished && user._id) {
    router.push('/')
  }

  return (
        <div className='main-background center-content full-screen'>
            <Form className='white-background p-4 shadow responsive-form' onSubmit={onSubmit} >
                <h1 className="h3 mb-3 fw-normal">Registrace</h1>
                <Form.Group>
                    <Form.Label>Uživatelské jméno</Form.Label>
                    <Form.Control type='text' name='name' placeholder='např. Karel22' value={inputValues.name} onChange={onChange}/>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email <span className='text-danger'>*</span></Form.Label>
                    <Form.Control type='text' name='email' placeholder='např. karel@gmail.com' value={inputValues.email} onChange={onChange}/>
                </Form.Group>

                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip id='password-requirements'>heslo musí obsahovat alespoň jedno velké písmeno, jedno malé písmeno, jedno číslo a musí být alespoň 7 znaků dlouhé</Tooltip>}
                >
                    <Form.Group>
                        <Form.Label>Heslo <span className='text-danger'>*</span></Form.Label>
                        <Form.Control type="password" name='password' placeholder="heslo" value={inputValues.password} onChange={onChange}/>
                    </Form.Group>
                </OverlayTrigger>

                <Form.Group>
                    <Form.Label>Heslo znovu <span className='text-danger'>*</span></Form.Label>
                    <Form.Control type="password" name='password2' placeholder="heslo znovu" value={inputValues.password2} onChange={onChange}/>
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
                          : 'Registrovat'
                    }
                </Button>
                <Link href='/login'>
                    <div className='mt-3 text-primary pointer'>
                        <a>Máte již účet? Přihlašte se</a>
                    </div>
                </Link>
            </Form>
        </div>
  )
}

export default Register

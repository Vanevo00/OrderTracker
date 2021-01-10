import React, { useEffect } from 'react'
import { gql } from '@apollo/client'
import { apolloClient } from '../../apollo/apollo'
import { useRouter } from 'next/router'
import { Alert } from 'react-bootstrap'

const ACTIVATE_USER = gql`
  mutation($activationCode: String!) {
    activateUser (activationCode: $activationCode) {
      _id
      email
    }
  }
`

interface ServerSideProps {
  query: {
    activationCode: string
  }
}

interface Props {
  success?: boolean
  error?: string
}

const Activate = ({ success, error }: Props) => {
  const router = useRouter()

  if (error || !success) {
    return (
      <div className='main-background center-content full-screen text-white text-center'>
        <Alert variant='danger'>
          <Alert.Heading>Vyskytla se chyba!</Alert.Heading>
          {error}<Alert.Link href='/'> Zpět na hlavní stránku</Alert.Link>
        </Alert>
      </div>
    )
  }

  useEffect(() => {
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  }, [])

  return (
      <div className='center-content text-white text-center full-screen main-background'>
        Aktivace proběhla úspěšně. Za okamžik budete přesměrováni na přihlašovací stránku.
      </div>
  )
}

export const getServerSideProps = async ({ query }: ServerSideProps) => {
  try {
    const {
      activationCode
    } = query

    await apolloClient.mutate({
      mutation: ACTIVATE_USER,
      variables: {
        activationCode
      }
    })

    return {
      props: {
        success: true
      }
    }
  } catch (err) {
    let error

    switch (err.message) {
      case 'user already activated':
        error = 'uživatel již byl aktivován.'
        break
      case 'activation code not found':
        error = 'aktivační kód nenalezen.'
        break
      default:
        error = 'zkuste to prosím znovu.'
    }

    return {
      props: {
        error
      }
    }
  }
}

export default Activate

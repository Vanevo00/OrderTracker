import React from 'react'
import { Alert } from 'react-bootstrap'
import { apolloClient } from '../apollo/apollo'
import { gql } from '@apollo/client'

const TEST_QUERY = gql`
  query($name: String!) {
    findOneUser (name: $name) {
      _id
      name
      email
    }
  }
`

const Home = ({ test }: any) => {
  return (
      <Alert variant='info'>{test}</Alert>
  )
}

export const getStaticProps = async () => {
  const res = await apolloClient.query({
    query: TEST_QUERY,
    variables: {
      name: 'Jarda'
    }
  })

  console.log('res', res)

  return {
    props: {
      test: 'test'
    }
  }
}

export default Home

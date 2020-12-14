import gql from 'graphql-tag'

export default gql`
    input Paginator {
        page: Int!
        size: Int!
        offset: Int
    }
`

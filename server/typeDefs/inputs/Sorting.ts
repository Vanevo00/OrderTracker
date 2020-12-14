import gql from 'graphql-tag'

export default gql`
    input Sorting {
        key: String
        order: SortingOrder
    }
`

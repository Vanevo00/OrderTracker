import { gql } from '@apollo/client'

export const CREATE_SUPPLIER = gql`
    mutation (
        $name: String!
        $abbreviation: String!
    ) {
        createSupplier(
            name: $name
            abbreviation: $abbreviation
        ) {
            _id
            name
            abbreviation
        }
    }
`

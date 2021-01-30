import { gql } from '@apollo/client'

export const GET_SUPPLIERS = gql`
    query (
        $sorting: Sorting
    ) {
        findSuppliersByUser (
            sorting: $sorting
        ) {
            _id
            abbreviation
            name
        }
    }
`

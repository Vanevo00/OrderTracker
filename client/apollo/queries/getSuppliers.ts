import { gql } from '@apollo/client'

export const GET_SUPPLIERS = gql`
    query {
        findSuppliersByUser {
            _id
            abbreviation
            name
        }
    }
`

import { gql } from '@apollo/client'

export const CREATE_EMPTY_ORDER = gql`
    mutation {
        createOrder {
            _id
            supplier {
                _id
                name
                abbreviation
            }
            name
            client
            phone
            email
            product
            notes
            smsSent
            pickedUp
            toBeReadyOn
            orderedOn
            updated
            created
        }
    }
`

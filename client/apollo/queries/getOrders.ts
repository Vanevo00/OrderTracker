import { gql } from '@apollo/client'

export const GET_ORDERS = gql`
    query(
        $archived: Boolean
    ) {
        findOrdersByUser(
            filters: {
                archived: $archived
            }
        ) {
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
            orderedOn
            toBeReadyOn
            updated
            created
        }
    }
`

import { gql } from '@apollo/client'

export const UPDATE_ORDER = gql`
    mutation (
        $_id: ID!
        $supplier: ID
        $name: String
        $client: String
        $phone: String
        $email: String
        $product: String
        $notes: String
        $smsSent: String
        $pickedUp: Boolean
        $toBeReadyOn: String
        $orderedOn: String
        $created: Date
    ) {
        updateOrder(
            _id: $_id
            supplier: $supplier
            name: $name
            client: $client
            phone: $phone
            email: $email
            product: $product
            notes: $notes
            smsSent: $smsSent
            pickedUp: $pickedUp
            toBeReadyOn: $toBeReadyOn
            orderedOn: $orderedOn
            created: $created
        )
    }
`

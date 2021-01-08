import { gql } from 'apollo-server-express'

export default gql`
    type Order {
        _id: ID!
        user: User!
        supplier: Supplier!
        name: String
        client: String!
        phone: String
        email: String
        product: String
        notes: String
        smsSent: Boolean
        pickedUp: Boolean
        toBeReadyOn: String
        updated: Date!
        created: Date!
    }

    extend type Query {
        findOrdersByUser(
            sorting: Sorting
            paginator: Paginator
        ): [Order]
    }

    extend type Mutation {
        createOrder(
            supplier: ID!
            name: String
            client: String!
            phone: String
            email: String
            product: String
            notes: String
            smsSent: Boolean
            pickedUp: Boolean
            toBeReadyOn: String
            created: Date
        ): Order
        
        updateOrder(
            _id: ID!
            supplier: ID!
            name: String
            client: String!
            phone: String
            email: String
            product: String
            notes: String
            smsSent: Boolean
            pickedUp: Boolean
            toBeReadyOn: String
            created: Date
        ): Boolean
        
        deleteOrder(
            _id: ID!
        ): Boolean
    }
`

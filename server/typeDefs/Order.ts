import { gql } from 'apollo-server-express'

export default gql`
    type Order {
        _id: ID!
        user: User!
        supplier: Supplier
        name: String
        client: String
        phone: String
        email: String
        product: String
        notes: String
        smsSent: String
        pickedUp: Boolean
        toBeReadyOn: String
        orderedOn: String
        updated: Date!
        created: Date!
        archived: Boolean!
    }
    
    input OrderFilters {
        archived: Boolean
    }

    extend type Query {
        findOrdersByUser(
            sorting: Sorting
            paginator: Paginator
            filters: OrderFilters
        ): [Order]
    }

    extend type Mutation {
        createOrder(
            supplier: ID
            name: String
            client: String
            phone: String
            email: String
            product: String
            notes: String
            smsSent: String
            pickedUp: Boolean
            toBeReadyOn: String
            orderedOn: String
            created: Date
        ): Order
        
        updateOrder(
            _id: ID!
            supplier: ID
            name: String
            client: String
            phone: String
            email: String
            product: String
            notes: String
            smsSent: String
            pickedUp: Boolean
            toBeReadyOn: String
            orderedOn: String
            created: Date
        ): Boolean
        
        deleteOrder(
            _id: ID!
        ): Boolean

        archiveOrder(
            _id: ID!
        ): Boolean
    }
`

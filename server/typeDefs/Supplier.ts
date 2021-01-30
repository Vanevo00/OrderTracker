import { gql } from 'apollo-server-express'

export default gql`
    type Supplier {
        _id: ID!
        user: User
        name: String!
        abbreviation: String
    }

    extend type Query {
        findSuppliersByUser(
            sorting: Sorting
        ): [Supplier]
    }

    extend type Mutation {
        createSupplier(
            name: String!
            abbreviation: String
        ): Supplier

        deleteSupplier(
            _id: ID!
        ): Boolean
    }
`

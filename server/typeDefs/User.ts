import { gql } from 'apollo-server-express'

export default gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: Int!
        activated: Boolean!
        updated: Date!
        created: Date!
    }

    extend type Mutation {
        registerUser(
            name: String!
            email: String!
            password: String!
        ): User

        loginByPassword(
            email: String!
            password: String!
        ): User
    }
`

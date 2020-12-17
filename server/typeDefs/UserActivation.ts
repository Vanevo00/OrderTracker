import { gql } from 'apollo-server-express'

export default gql`
    type UserActivation {
        _id: ID!
        activationCode: String!
        user: User!
        created: Date!
    }

    extend type Mutation {
        activateUser(
            activationCode: String!
        ): User
    }
`

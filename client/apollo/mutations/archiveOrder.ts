import { gql } from '@apollo/client'

export const ARCHIVE_ORDER = gql`
    mutation (
        $id: ID!
    ) {
        archiveOrder(
            _id: $id
        )
    }
`

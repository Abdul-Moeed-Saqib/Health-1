import { gql } from "@apollo/client";

const QUERY_EMERGENCIES = gql`
    query getEmergencies{
        emerAlerts{
            id
            content
            isAccepted
            patient{
                _id
                email
                firstName
                lastName
                address
                city
                phoneNumber
            }
        }
    }
`

export { QUERY_EMERGENCIES }
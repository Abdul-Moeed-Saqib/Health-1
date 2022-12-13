import { gql } from "@apollo/client";

const GET_EMERGIENCIES = gql`
query getEmergencies {
    emerAlerts {
      _id,
      content,
      isAccepted,
      patient {
        firstName,
        lastName,
        city
      }
    }
  }
`

const GET_EMERGENCY = gql`
  query getEmergency {
    findEmerAlert {
      _id,
      isAccepted 
    }
  }
`

export { GET_EMERGIENCIES, GET_EMERGENCY};
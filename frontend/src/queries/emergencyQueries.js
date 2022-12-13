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

export { GET_EMERGIENCIES };
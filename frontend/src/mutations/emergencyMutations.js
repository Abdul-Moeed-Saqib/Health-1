import { gql } from "@apollo/client";

const UPDATE_EMERG = gql`
mutation UpdateEmergencyAlert($id: String!, $isAccepted: Boolean!) {
    updateEmergencyAlert(id: $id, isAccepted: $isAccepted) {
      content,
      isAccepted,
      patient {
        lastName
      }
    }
  }
`

export { UPDATE_EMERG };
import { gql } from "@apollo/client";

const ADD_EMERG = gql`
mutation AddEmergencyAlert($content: String!) {
  addEmergencyAlert(content: $content) {
    content
    patient {
      firstName
      lastName
    }
  }
}
`

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

export { UPDATE_EMERG, ADD_EMERG};
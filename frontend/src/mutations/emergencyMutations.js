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

const DELETE_EMERG = gql`
  mutation DeleteEmergencyAlert($id: String!) {
    deleteEmergencyAlert(id: $id) {
      _id
    }
  }
`

export { UPDATE_EMERG, ADD_EMERG, DELETE_EMERG};
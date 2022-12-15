import { gql } from "@apollo/client";

const GET_VITALSIGNS = gql`
  query getVitalSigns($id: String!) {
    vitalSigns(id: $id) {
      id
      bodyTem
      heartRate
      bloodPre
      respiratoryRate
      createdAt
      diagnosis
    }
  }
`;

export { GET_VITALSIGNS };

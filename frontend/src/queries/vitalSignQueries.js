import { gql } from "@apollo/client";

const GET_VITALSIGNS = gql`
  query getVitalSigns($id: String!) {
    vitalSigns(id: $id) {
      bodyTem
      heartRate
      bloodPre
      respiratoryRate
    }
  }
`;

export { GET_VITALSIGNS };

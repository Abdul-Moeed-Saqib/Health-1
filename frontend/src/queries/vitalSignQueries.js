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

const GET_PREDICTION = gql`
  query getPrediction($bloodPre: Float!) {
    predictBloodPressure(bloodPre: $bloodPre) {
      row
    }
  }
`

export { GET_VITALSIGNS, GET_PREDICTION };

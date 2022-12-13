import { gql } from "@apollo/client";

const ADD_VITAL = gql`
mutation AddVitalSign(
    $patientId: String!
    $bodyTem: Number!
    $heartRate: Number!
    $bloodPre: Number!
    $respiratoryRate: Number!
    ) {
        addVitalSign(
            patientId: $patientId,
            bodyTem: $bodyTem,
            heartRate:$heartRate,
            bloodPre:$bloodPre
            ){
                bodyTem,
                heartRate,
                bloodPre,
                respiratoryRate
            }
    }
`

const DELETE_VITAL = gql`
mutation DeleteVitalSign(
    $id: String!
){
    deleteVitalSign(
        id:$id
    ){
        id
    }
}

`

export { ADD_VITAL, DELETE_VITAL};
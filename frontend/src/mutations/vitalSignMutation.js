import { gql } from "@apollo/client";

const ADD_VITAL = gql`
mutation AddVitalSign(
    $patientId: String!
    $bodyTem: Float!
    $heartRate: Float!
    $bloodPre: Float!
    $respiratoryRate: Float!
    ) {
        addVitalSign(
            patientId: $patientId,
            bodyTem: $bodyTem,
            heartRate:$heartRate,
            bloodPre:$bloodPre,
            respiratoryRate: $respiratoryRate
            ){
                bodyTem,
                heartRate,
                bloodPre,
                respiratoryRate
            }
    }
`

const UPDATE_DIAGNOSIS = gql`
mutation UpdateDiagnosis(
    $id: String!
    $diagnosis: String!
){
    updateDiagnosis(
        id:$id
        diagnosis:$diagnosis
    ){
        bodyTem
        heartRate,
        bloodPre,
        respiratoryRate
        diagnosis
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

export { ADD_VITAL, DELETE_VITAL, UPDATE_DIAGNOSIS };
import { gql } from "@apollo/client";

const GET_PATIENTS = gql` 
query getPaitents{
  patients{
    _id
    email
    firstName
    lastName
    address
    city
    phoneNumber
  }
}
`
export { GET_PATIENTS }

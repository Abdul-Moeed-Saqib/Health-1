import { gql, useMutation } from "@apollo/client";

const REGISTER_USER = gql`
  mutation Register(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $address: String!
    $city: String!
    $phoneNumber: String!
    $role: String!
  ) {
    register(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      phoneNumber: $phoneNumber
      role: $role
    ) {
      firstName
      role
      token
    }
  }
`;

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email:$email, password: $password) {
            firstName
            role
            token
        }
    }
`

export { REGISTER_USER, LOGIN_USER };

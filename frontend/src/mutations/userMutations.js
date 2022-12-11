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

const REQUIRE_AUTH = gql`
mutation RequireAuth($token: String!) {
  requireAuth(token: $token) {
    _id
  }
}
`

export { REGISTER_USER, REQUIRE_AUTH };

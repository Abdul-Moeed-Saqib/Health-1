import { gql } from "@apollo/client";

const GET_MOTIVATIONALTIP = gql`
    query getMotivationalTip {
        motiavtionalTip {
            description
        }
    }
`

export { GET_MOTIVATIONALTIP }